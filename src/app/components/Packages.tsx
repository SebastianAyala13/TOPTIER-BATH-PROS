'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const packages = [
  {
    name: 'Essential Refresh',
    price: 'From $7,900',
    features: ['Tub-to-shower conversion', 'New vanity & mirror', 'Floor & wall tile updates'],
    image: '/packages/essential.jpg',
  },
  {
    name: 'Modern Upgrade',
    price: 'From $12,900',
    features: ['Walk-in shower w/ glass', 'Quartz vanity top', 'Matte black or gold fixtures'],
    image: '/packages/modern.jpg',
  },
  {
    name: 'Luxury Spa',
    price: 'From $19,900',
    features: ['Freestanding tub', 'Custom lighting & niches', 'Premium stone & fixtures'],
    image: '/packages/luxury.jpg',
  },
];

export default function Packages() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-10 text-center">Bathroom Packages</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((p) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ amount: 0.5 }}
              className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-white"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image 
                  src={p.image} 
                  alt={p.name} 
                  fill
                  className="object-cover" 
                />
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold text-slate-800">{p.name}</h3>
                  <span className="text-teal-600 font-bold">{p.price}</span>
                </div>
                <ul className="mt-3 text-sm text-slate-600 space-y-1 list-disc list-inside">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="mt-5">
                  <a href="#form-section" className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-full">Get a Quote</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


