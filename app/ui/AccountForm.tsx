'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { updateUserCompany } from '@/app/actions';

interface Company {
  id: number;
  name: string;
}

export default function AccountForm({
  companies,
  currentUserCompanyId,
}: {
  companies: Company[];
  currentUserCompanyId: number | null;
}) {
  const initialState = { message: null };
  const [state, formAction] = useFormState(updateUserCompany, initialState);

  return (
    <>
      <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">Company Link</h2>
      <form action={formAction} className="mt-6 space-y-4">
        <div>
          <label htmlFor="companyId" className="block text-sm font-medium text-gray-700 mb-1">
            Currently linked to: <span className="font-medium">
              {companies.find((c) => c.id === currentUserCompanyId)?.name || 'None'}
            </span>
          </label>
          <select
            id="companyId"
            name="companyId"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
            defaultValue={currentUserCompanyId || ''}
          >
            <option value="">-- Select a Company --</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>{company.name}</option>
            ))}
          </select>
        </div>
        <SubmitButton />
        {state?.message && <p className="mt-2 text-sm text-green-600">{state.message}</p>}
      </form>
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? 'Saving...' : 'Save Company Link'}
    </button>
  );
}