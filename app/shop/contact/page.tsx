'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleContactForm, State } from '@/app/actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="cursor-pointer w-full bg-amber-800 text-white py-3 px-4 rounded-xl font-semibold shadow-md hover:bg-amber-600 active:scale-[0.98] disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed transition-all duration-200"
    >
      {pending ? 'Sending...' : 'Send Message'}
    </button>
  );
}

export default function ContactPage() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(handleContactForm, initialState);
  return (
    <main className="pt-12 pb-12" style={{ backgroundColor: '#241c1f' }}>
      <div className="max-w-md mx-auto p-8 bg-zinc-900/80 backdrop-blur-md border border-amber-900/40 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold text-gray-200">Contact Us</h1>
        <p className="text-sm text-zinc-100 mb-6">
          Have questions about our handmade products? Leave us a message.
        </p>
        <form action={formAction} className="space-y-4">
          {/* NAME FIELD */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Name
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={state?.enteredValues?.name || ''}
                placeholder="Enter a valid name..."
                className="w-full text-zinc-100 placeholder-zinc-500 bg-zinc-800/50 px-4 py-2.5 border border-zinc-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
              />
            </label>
            {state?.errors?.name && (
              <span className="mt-1 text-xs text-red-600">
                {state.errors.name[0]}
              </span>
            )}
          </div>

          {/* EMAIL FIELD */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Email
              <input
                type="text"
                id="email"
                name="email"
                defaultValue={state?.enteredValues?.email || ''}
                placeholder="Enter a valid email..."
                className="w-full text-zinc-100 placeholder-zinc-500 bg-zinc-800/50 px-4 py-2.5 border border-zinc-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
              />
            </label>
            {state?.errors?.email && (
              <span className="mt-1 text-xs text-red-600">
                {state.errors.email[0]}
              </span>
            )}
          </div>

          {/* MESSAGE FIELD */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Message
              <textarea
                id="contentMessage"
                name="contentMessage"
                rows={4}
                defaultValue={state?.enteredValues?.contentMessage || ''}
                placeholder="Enter your message!"
                className="w-full text-zinc-100 placeholder-zinc-500 bg-zinc-800/50 px-4 py-2.5 border border-zinc-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
              />
            </label>
            {state?.errors?.contentMessage && (
              <span className="mt-1 text-xs text-red-600">
                {state.errors.contentMessage[0]}
              </span>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <SubmitButton />
        </form>
      </div>
    </main>
  );
}
