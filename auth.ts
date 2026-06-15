import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { query } from "@/app/lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, profile }) {
      if (!user.email) return false
      try {
        // GitHub provides numeric ID; store as string in github_id
        const githubId = (profile as any)?.id?.toString() ?? null
        
        await query(
          `INSERT INTO users (name, email, avatar_url, github_id)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (email) DO UPDATE 
           SET name = EXCLUDED.name, 
               avatar_url = EXCLUDED.avatar_url,
               github_id = EXCLUDED.github_id`,
          [
            user.name ?? "Anonymous",
            user.email,
            user.image ?? null,
            githubId,
          ]
        )
        return true
      } catch (error) {
        console.error("Failed to upsert user:", error)
        return false
      }
    },
    async jwt({ token, user }) {
      // On sign-in, fetch the DB user ID and store in token
      if (user?.email) {
        const { rows } = await query<{ id: string }>(
          'SELECT id FROM users WHERE email = $1',
          [user.email]
        )
        if (rows[0]) {
          token.dbId = rows[0].id
        }
      }
      return token
    },
    async session({ session, token }) {
      // Use the DB ID from the token
      if (token?.dbId && session.user) {
        session.user.id = token.dbId as string
      }
      return session
    },
  },
})