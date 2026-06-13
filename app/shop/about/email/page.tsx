'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleContactForm, State } from '@/app/actions';
import Link from 'next/link';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-amber-600 hover:bg-amber-500 text-stone-950 py-4 px-6 rounded-2xl font-bold shadow-lg transition-all active:scale-[0.98] disabled:bg-stone-800 disabled:text-stone-500 disabled:cursor-not-allowed uppercase text-sm tracking-widest cursor-pointer"
    >
      {pending ? 'Sending Message...' : 'Submit Form'}
    </button>
  );
}

export default function EmailSubmissionPage() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(handleContactForm, initialState);

  return (
    <main className="min-h-screen pt-12 pb-20 px-4" style={{ backgroundColor: '#241c1f' }}>
      <div className="max-w-xl mx-auto">
        <Link 
          href="/shop/about" 
          className="inline-flex items-center text-stone-500 hover:text-amber-500 mb-8 transition-colors text-sm font-medium"
        >
          &larr; Back to About Us
        </Link>

        <div className="bg-stone-900/60 backdrop-blur-xl border border-stone-800 p-8 md:p-12 rounded-[2rem] shadow-2xl">
          <div className="mb-10">
            <h1 className="text-3xl font-serif font-bold text-white mb-2">Email Submission</h1>
            <p className="text-stone-400">
              Please share your thoughts or inquiries with us.
            </p>
          </div>

          {state?.message && (!state.errors || Object.keys(state.errors).length === 0) && (
            <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-500 text-sm font-medium text-center">
              {state.message}
            </div>
          )}

          <form action={formAction} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2 ml-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={state?.enteredValues?.name || ''}
                placeholder="How should we address you?"
                className="w-full text-stone-100 placeholder-stone-600 bg-stone-800/40 px-5 py-4 border border-stone-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
              />
              {state?.errors?.name && (
                <p className="mt-2 text-xs text-rose-400 font-medium ml-1">
                  {state.errors.name[0]}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={state?.enteredValues?.email || ''}
                placeholder="Where can we reach you?"
                className="w-full text-stone-100 placeholder-stone-600 bg-stone-800/40 px-5 py-4 border border-stone-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
              />
              {state?.errors?.email && (
                <p className="mt-2 text-xs text-rose-400 font-medium ml-1">
                  {state.errors.email[0]}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contentMessage" className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2 ml-1">
                Your Message
              </label>
              <textarea
                id="contentMessage"
                name="contentMessage"
                rows={5}
                defaultValue={state?.enteredValues?.contentMessage || ''}
                placeholder="Tell us what's on your mind..."
                className="w-full text-stone-100 placeholder-stone-600 bg-stone-800/40 px-5 py-4 border border-stone-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all resize-none"
              />
              {state?.errors?.contentMessage && (
                <p className="mt-2 text-xs text-rose-400 font-medium ml-1">
                  {state.errors.contentMessage[0]}
                </p>
              )}
            </div>

            <SubmitButton />
          </form>
        </div>
      </div>
    </main>
  );
}