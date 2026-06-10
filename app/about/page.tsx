export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">

      {/* HERO */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">About Us</h1>
      <p className="text-gray-600 mb-12">
        Handcrafted Haven is a marketplace built by Team 08 to connect artisans
        with people who love handmade, one-of-a-kind products.
      </p>

      {/* MISSION */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Our Mission</h2>
        <p className="text-gray-600">
          We believe every handcrafted item tells a story. Our mission is to give
          skilled artisans a platform to share their craft with the world, while
          giving buyers access to meaningful, quality-made products that cannot
          be found in any big-box store.
        </p>
      </section>

      {/* VALUES */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="font-semibold text-gray-800 mb-2">Community</h3>
            <p className="text-sm text-gray-600">
              We champion independent makers and foster a supportive community
              of creators and buyers.
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="text-3xl mb-3">✨</div>
            <h3 className="font-semibold text-gray-800 mb-2">Quality</h3>
            <p className="text-sm text-gray-600">
              Every item on our platform is handmade with care, skill, and
              attention to detail.
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="text-3xl mb-3">🌍</div>
            <h3 className="font-semibold text-gray-800 mb-2">Sustainability</h3>
            <p className="text-sm text-gray-600">
              We support artisans who use ethical, sustainable materials and
              practices in their work.
            </p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Meet the Team</h2>
        <ul className="space-y-3 text-gray-600">
          <li>Fabian — Manager</li>
          <li>Burdick — Developer</li>
          <li>Keokpe — Developer</li>
        </ul>
      </section>

    </main>
  );
}