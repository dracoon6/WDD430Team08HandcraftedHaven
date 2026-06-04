'use server';

import { z } from 'zod';

const FormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.email({ message: 'Invalid email address.' }),
  contentMessage: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' }),
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
