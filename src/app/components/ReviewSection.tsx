'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
// English-only site

const reviewVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

export default function ReviewSection() {
  const reviews = [
    {
      logo: '/google-logo.png',
      alt: 'Google Reviews',
      text: '“TOPTIER BATH PROS converted our tub to a modern glass shower. Impeccable work!”',
      author: '– Alicia R., Texas ⭐⭐⭐⭐⭐',
    },
    {
      logo: '/google-logo.png',
      alt: 'Facebook Reviews',
      text: '“They remodeled our master bathroom completely. On time and spectacular results. 10/10.”',
      author: '– James T., Florida ⭐⭐⭐⭐⭐',
    },
    {
      logo: '/google-logo.png',
      alt: 'LinkedIn Reviews',
      text: '“Reliable company. Excellent communication and spotless cleanup. Our HOA was impressed.”',
      author: '– Carla G., California ⭐⭐⭐⭐⭐',
    },
    {
      logo: '/google-logo.png',
      alt: 'Google Reviews',
      text: '“They explained every step and beat two other quotes. The bathroom looks magazine-worthy.”',
      author: '– David P., Georgia ⭐⭐⭐⭐⭐',
    },
    {
      logo: '/google-logo.png',
      alt: 'Facebook Reviews',
      text: '“As a single mom I feared scams. TOPTIER BATH PROS was honest and transparent. Highly recommended.”',
      author: '– Jessica M., North Carolina ⭐⭐⭐⭐⭐',
    },
    {
      logo: '/google-logo.png',
      alt: 'LinkedIn Reviews',
      text: '“As a realtor I work with many contractors. These guys are next level. Fast, clean, and well-priced.”',
      author: '– Robert S., Nevada ⭐⭐⭐⭐⭐',
    },
  ];

  return (
    <section
      className="py-20 px-6 backdrop-blur-lg bg-transparent"
      id="reviews"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.5 }}
          className="text-4xl font-bold text-white drop-shadow mb-12"
        >
          Real reviews from real homeowners
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              variants={reviewVariants}
              viewport={{ amount: 0.5 }}
              className="border border-white/20 bg-white/10 text-white p-6 rounded-2xl shadow-lg backdrop-blur-md"
            >
              <Image src={review.logo} alt={review.alt} width={80} height={20} />
              <p className="mt-4 text-sm italic">{review.text}</p>
              <p className="mt-3 font-semibold text-teal-300">{review.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
