import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen text-stone-100 p-6 md:p-20" style={{ backgroundColor: '#241c1f' }}>
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-amber-500 mb-4">
            About Handcrafted Haven
          </h1>
          <p className="text-xl text-stone-400 font-light tracking-wide">
            Crafting connections between independent artisans and the world.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6 text-lg leading-relaxed text-stone-300">
            <p>
              At <span className="text-amber-500 font-semibold">Handcrafted Haven</span>, we believe that the most beautiful things in life aren&apos;t manufactured on an assembly line—they are born from passion, patience, and human touch.
            </p>
            <p>
              Our journey began with a simple goal: to provide a dedicated space where independent artisans could thrive. We wanted to build a haven where unique craftsmanship is celebrated and where every purchase supports a maker&apos;s dream.
            </p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-stone-900 border border-stone-800 rounded-2xl h-80 overflow-hidden flex items-center justify-center">
              <span className="text-stone-600 text-sm uppercase tracking-widest font-bold">Artisan Spirit</span>
            </div>
          </div>
        </div>

        <section className="bg-stone-900/40 border border-stone-800 p-10 rounded-3xl text-center">
          <h2 className="text-3xl font-serif font-medium text-white mb-6">Want to get in touch?</h2>
          <p className="text-stone-400 mb-8 max-w-lg mx-auto">
            Whether you have a question about a product, want to join our community, or just want to say hi, our team is ready to help.
          </p>
          <div className="flex justify-center">
            <Link 
              href="/shop/about/email"
              className="inline-block bg-amber-600 hover:bg-amber-500 text-stone-950 px-10 py-4 rounded-2xl font-bold transition-all transform hover:-translate-y-1 active:scale-95 shadow-xl uppercase text-sm tracking-widest"
            >
              Go to Email Submission
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}