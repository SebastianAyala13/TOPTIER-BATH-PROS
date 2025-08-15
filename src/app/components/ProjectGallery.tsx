'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const projects = [
  {
    image: '/bath-1.jpg',
    title: 'Modern Bathroom — Dallas, TX',
    description: 'Walk-in shower with frameless glass and marble-look porcelain.',
  },
  {
    image: '/bath-2.jpg',
    title: 'Coastal Style — Miami, FL',
    description: 'Floating vanity, LED mirror, and terrazzo-style floor.',
  },
  {
    image: '/bath-3.jpg',
    title: 'Compact Remodel — Houston, TX',
    description: 'Tub-to-shower conversion to maximize space and accessibility.',
  },
  {
    image: '/bath-4.jpg',
    title: 'Luxury Spa — Austin, TX',
    description: 'Freestanding tub, brushed gold fixtures, and custom lighting.',
  },
  {
    image: '/bath-5.jpg',
    title: 'Before & After — San Antonio, TX',
    description: 'Complete transformation with new tile, vanity, and fixtures.',
  },
];

export default function ProjectGallery() {
  return (
    <section id="projects" className="py-20 bg-white bg-pattern">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-slate-800">
          Recent Bathroom Remodels
        </h2>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          className="rounded-xl shadow-xl"
        >
          {projects.map((project, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full overflow-hidden rounded-xl group">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-0 w-full bg-black/50 text-white p-4 text-left">
                  <h3 className="font-bold text-lg">{project.title}</h3>
                  <p className="text-sm">{project.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
