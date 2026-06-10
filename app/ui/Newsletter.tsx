'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name || !email) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-2">Stay in the Loop</h2>
        <p className="text-gray-400 mb-8 text-sm">
          Get updates on new artisans, products, and handcrafted stories
          delivered to your inbox.
        </p>

        {submitted ? (
          <p className="text-green-400 font-medium">
            Thanks for subscribing, {name}!
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-gray-400"
            />
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-gray-400"
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-white text-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Subscribe
            </button>
          </div>
        )}
      </div>
    </div>
  );
}