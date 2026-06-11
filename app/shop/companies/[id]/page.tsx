import { query } from '@/app/lib/db';
import { auth } from '@/auth';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function CompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  
  const { rows } = await query('SELECT * FROM companies WHERE id = $1', [id]);
  const company = rows[0];

  if (!company) notFound();

  return (
    <div className="p-10 max-w-5xl">
      <div className="flex justify-between items-start mb-10">
        <div className="flex items-center gap-8">
          <img 
            src={company.logo_url} 
            alt={company.name} 
            className="w-40 h-40 rounded-3xl shadow-lg object-cover"
          />
          <div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tight">{company.name}</h1>
            <p className="text-xl text-gray-500 mt-2 font-medium">{company.location}</p>
          </div>
        </div>
        {session && (
          <Link 
            href={`/shop/companies/${id}/edit`}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition"
          >
            Edit Profile
          </Link>
        )} 
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">About Us</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{company.bio}</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Expertise</h2>
            <div className="flex flex-wrap gap-3">
              {company.product_types?.map((type: string) => (
                <span key={type} className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-sm rounded-lg border border-slate-200">
                  {type}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6 self-start">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest border-b pb-4">Direct Contact</h2>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Email Address</label>
            <p className="text-gray-900 font-medium">{company.email}</p>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Phone Number</label>
            <p className="text-gray-900 font-medium">{company.phone_number}</p>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Official Website</label>
            <a href={company.website} target="_blank" className="text-blue-600 font-bold hover:text-blue-700 transition">
              {company.website?.replace(/^https?:\/\//, '')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}