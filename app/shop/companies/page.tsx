import { query } from '@/app/lib/db';
import Link from 'next/link';

export default async function CompaniesPage() {
  const { rows: companies } = await query(
    'SELECT * FROM companies ORDER BY name ASC',
  );

  return (
    <div className="p-10">
      <h1 className="text-3xl text-white font-serif font-semibold mt-2">
        Our Artisan Partners
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {companies.map((company: any) => (
          <Link
            key={company.id}
            href={`/companies/${company.id}`}
            className="group block p-6 bg-zinc-200 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition duration-200"
          >
            <div className="flex items-center gap-5">
              <img
                src={company.logo_url || 'https://via.placeholder.com/150'}
                alt={company.name}
                className="w-20 h-20 rounded-xl object-cover grayscale group-hover:grayscale-0 transition"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-800 hover:text-amber-500">
                  {company.name}
                </h2>
                <p className="text-sm text-gray-500 font-medium">
                  {company.location}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
