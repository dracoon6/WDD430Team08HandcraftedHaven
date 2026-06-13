import { auth } from '@/auth';
import { query } from '@/app/lib/db';
import { redirect } from 'next/navigation';
import AccountForm from '@/app/ui/AccountForm';

interface Company {
  id: number;
  name: string;
}

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/api/auth/signin');
  }

  const userEmail = session.user.email;
  let currentUserCompanyId: number | null = null;
  let companies: Company[] = [];

  try {
    // Fetch user's current company link from your custom users table
    const userResult = await query('SELECT company_id FROM users WHERE email = $1', [userEmail]);
    if (userResult.rows.length > 0) {
      currentUserCompanyId = userResult.rows[0].company_id;
    }

    // Fetch all companies for the linking dropdown
    const companiesResult = await query('SELECT id, name FROM companies ORDER BY name ASC');
    companies = companiesResult.rows as Company[];

  } catch (error) {
    console.error('Database Error fetching user or companies:', error);
    // In a real application, you might want to display a user-friendly error message
  }

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Your Profile</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8 border border-gray-200">
        <div className="flex items-center space-x-4 mb-4">
          {session.user.image && (
            <img
              src={session.user.image}
              alt="User Avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <div>
            <p className="text-xl font-semibold text-gray-800">{session.user.name}</p>
            <p className="text-gray-600">{session.user.email}</p>
          </div>
        </div>

        <AccountForm
          companies={companies}
          currentUserCompanyId={currentUserCompanyId}
        />
      </div>
    </div>
  );
}