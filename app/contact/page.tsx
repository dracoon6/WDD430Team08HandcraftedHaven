'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleContactForm, State } from '../actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-slate-900 text-white py-2 px-4 rounded-md font-medium hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed transition"
    >
      {pending ? 'Sending...' : 'Send Message'}
    </button>
  );
}

export default function ContactPage() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(handleContactForm, initialState);
  return (
    <div className="max-w-md mx-auto mt-12 p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h1>
      <form action={formAction} className="space-y-4">
        {/* NAME FIELD */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={state?.enteredValues?.name || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
            <input
              type="text"
              id="email"
              name="email"
              defaultValue={state?.enteredValues?.email || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
            <textarea
              id="contentMessage"
              name="contentMessage"
              rows={4}
              defaultValue={state?.enteredValues?.contentMessage || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
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
  );
}
