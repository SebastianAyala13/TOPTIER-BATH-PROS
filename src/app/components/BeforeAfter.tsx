'use client';

import { useState } from 'react';

export default function BeforeAfter() {
  const [value, setValue] = useState(50);
  const [beforeSrc, setBeforeSrc] = useState('/before-afterbath-before.jpg');
  const [afterSrc, setAfterSrc] = useState('/before-afterbath-after.jpg');

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6 text-center">Before & After</h2>
        <p className="text-center text-slate-600 mb-8">Slide to compare the transformation.</p>

        <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
          <img
            src={afterSrc}
            alt="Bathroom after remodel"
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => {
              if (afterSrc === '/before-afterbath-after.jpg') setAfterSrc('/before-after/bath-after.jpg');
            }}
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${value}%` }}
          >
            <img
              src={beforeSrc}
              alt="Bathroom before remodel"
              className="w-full h-full object-cover"
              onError={() => {
                if (beforeSrc === '/before-afterbath-before.jpg') setBeforeSrc('/before-after/bath-before.jpg');
              }}
            />
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            aria-label="Before after slider"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2/3 accent-teal-500"
          />
        </div>
      </div>
    </section>
  );
}


