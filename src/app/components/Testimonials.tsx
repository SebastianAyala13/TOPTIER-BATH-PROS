'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
// English-only site

export default function Testimonials() {

  const testimonials = [
    {
      name: 'Carlos M.',
      image: '/experience1.jpg',
      text: {
        en: 'Our bathroom looks like a spa now. They guided us with materials and layout. Clean work and finished on time. Highly recommended! 👍',
      },
    },
    {
      name: 'Emily R.',
      image: '/experience2.jpg',
      text: {
        en: 'They converted our tub to a walk-in shower. The tile work is perfect and it’s safer for my parents now.',
      },
    },
    {
      name: 'Luis A.',
      image: '/experience3.jpg',
      text: {
        en: 'They remodeled our small guest bath and made it feel bigger. Great storage solutions and lighting.',
      },
    },
    {
      name: 'Sarah T.',
      image: '/experience4.jpg',
      text: {
        en: 'From the first design to the final fixture, communication was clear. My master bath is stunning!',
      },
    },
    {
      name: 'Mark P.',
      image: '/experience5.jpg',
      text: {
        en: 'They handled permits and inspections. The result exceeded expectations and added value to our home.',
      },
    },
    {
      name: 'Julia G.',
      image: '/experience6.jpg',
      text: {
        en: 'Everything was on schedule and the finishes are top quality. Love the illuminated mirror and rain shower.',
      },
    },
  ];

  return (
    <section id="testimonials" className="relative py-20 px-4 text-white overflow-hidden">
      {/* Fondo visual */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/background-video-blur.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Animación del título */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.5 }}
          className="text-3xl font-bold mb-10 text-black drop-shadow-md text-center"
        >
          What our clients say
        </motion.h2>

        {/* Carrusel móvil */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.5 }}
          className="flex md:hidden gap-6 overflow-x-auto snap-x snap-mandatory pb-4 px-1"
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="min-w-[280px] snap-center bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 hover:shadow-2xl transition flex flex-col overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Image src={t.image} alt={t.name} fill className="object-cover" />
              </div>
              <div className="p-4 text-slate-800 text-center">
                <p className="text-sm italic">“{t.text.en}”</p>
                <p className="mt-4 text-sm font-semibold text-teal-600">— {t.name}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Grid escritorio */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.5 }}
          className="hidden md:grid gap-8 md:grid-cols-3"
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 hover:shadow-2xl transition flex flex-col overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Image src={t.image} alt={t.name} fill className="object-cover" />
              </div>
              <div className="p-4 text-slate-800 text-center">
                <p className="text-sm italic">“{t.text.en}”</p>
                <p className="mt-4 text-sm font-semibold text-teal-600">— {t.name}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
