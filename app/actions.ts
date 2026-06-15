'use server';

import { z } from 'zod';
import { query } from './lib/db';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { upsertReview, deleteReview } from './lib/reviews';

const FormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  contentMessage: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' }),
});

const CompanySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  bio: z.string().max(1000).optional(),
  location: z.string().min(2),
  productTypes: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
});

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    contentMessage?: string[];
  };
  message?: string | null;
  enteredValues?: {
    name: string;
    email: string;
    contentMessage: string;
  };
};

export async function handleContactForm(prevState: State, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    contentMessage: formData.get('contentMessage'),
  });

  const rawData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    contentMessage: formData.get('contentMessage') as string,
  };

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Message',
      enteredValues: rawData,
    };
  }

  const { name, email, contentMessage } = validatedFields.data;

  try {
    console.log('Sending Validated Data:', { name, email, contentMessage });
    return {
      message: 'Thank you! Your message has been sent successfully.',
    };
  } catch (error) {
    return {
      message: 'Database/Server error. Please try again later.',
      enteredValues: rawData,
    };
  }
}

export async function updateCompany(prevState: any, formData: FormData) {
  const validatedFields = CompanySchema.safeParse({
    id: formData.get('id') as string,
    name: formData.get('name') as string,
    bio: formData.get('bio') as string,
    location: formData.get('location') as string,
    productTypes: formData.get('productTypes') as string,
    email: formData.get('email') as string,
    phoneNumber: formData.get('phoneNumber') as string,
    website: formData.get('website') as string,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input fields.',
    };
  }

  const { id, name, bio, location, productTypes, email, phoneNumber, website } = validatedFields.data;
  const productTypesArray = productTypes 
    ? productTypes.split(',').map(s => s.trim()).filter(Boolean) 
    : [];

  try {
    await query(
      `UPDATE companies 
       SET name = $1, bio = $2, location = $3, product_types = $4, email = $5, phone_number = $6, website = $7 
       WHERE id = $8`,
      [
        name,
        bio,
        location,
        productTypesArray,
        email,
        phoneNumber,
        website,
        id
      ]
    );

    revalidatePath(`/companies/${id}`);
    return { message: 'Profile updated successfully!' };
  } catch (error) {
    return { message: 'Database error. Please try again.' };
  }
}

export async function updateUserCompany(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) {
    return { message: 'Not authenticated' };
  }

  const companyIdValue = formData.get('companyId');
  const companyId = companyIdValue ? companyIdValue.toString() : null;
  const email = session.user.email;
  const name = session.user.name;
  const image = session.user.image;

  try {
    await query(
      `INSERT INTO users (name, email, avatar_url)
       VALUES ($1, $2, $3)
       ON CONFLICT (email) 
       DO UPDATE SET name = EXCLUDED.name, avatar_url = EXCLUDED.avatar_url`,
      [name, email, image]
    );

    revalidatePath('/account');
    return { message: 'Profile updated and linked successfully!' };
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database error. Please try again.' };
  }
}

// ============================================
// REVIEW ACTIONS
// ============================================

// Helper: Get user UUID from session
async function getUserIdFromSession(): Promise<string | null> {
  const session = await auth();
  
  // Try session.user.id first (DB UUID, set by auth.ts callback)
  if (session?.user?.id) {
    return session.user.id;
  }
  
  // Fallback: lookup by email
  if (!session?.user?.email) return null;

  const { rows } = await query<{ id: string }>(
    'SELECT id FROM users WHERE email = $1',
    [session.user.email]
  );
  return rows[0]?.id ?? null;
}

// SUBMIT REVIEW (handles both create + update via UPSERT)
export async function submitReview(
  productId: string,
  rating: number,
  reviewText: string
) {
  const userId = await getUserIdFromSession();

  if (!userId) {
    return { error: 'You must be logged in to submit a review' };
  }

  // Server-side validation (defense in depth)
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { error: 'Rating must be a whole number between 1 and 5' };
  }

  const trimmed = reviewText.trim();
  if (trimmed.length < 5) {
    return { error: 'Review must be at least 5 characters long' };
  }

  if (trimmed.length > 2000) {
    return { error: 'Review must be less than 2000 characters' };
  }

  try {
    await upsertReview(productId, userId, rating, trimmed);
    revalidatePath(`/shop/product/${productId}`);
    revalidatePath('/shop');
    return { success: true };
  } catch (err) {
    console.error('Failed to submit review:', err);
    return { error: 'Failed to submit review. Please try again.' };
  }
}

// DELETE REVIEW
export async function deleteReviewAction(
  reviewId: string,
  productId: string
) {
  const userId = await getUserIdFromSession();

  if (!userId) {
    return { error: 'You must be logged in to delete a review' };
  }

  try {
    const success = await deleteReview(reviewId, userId);
    if (!success) {
      return {
        error: 'Review not found or you do not have permission to delete it',
      };
    }
    revalidatePath(`/shop/product/${productId}`);
    revalidatePath('/shop');
    return { success: true };
  } catch (err) {
    console.error('Failed to delete review:', err);
    return { error: 'Failed to delete review' };
  }
}