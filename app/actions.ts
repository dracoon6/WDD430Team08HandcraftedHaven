'use server';

import { z } from 'zod';
import { query } from './lib/db';
import { revalidatePath } from 'next/cache';

const FormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.email({ message: 'Invalid email address.' }),
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
