'use client';

import { useState, useEffect } from 'react';
import Form from '@/app/Form';

export default function StickyLeadForm() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const targetElement = document.getElementById('lead-form');
    if (!targetElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky form when main form is NOT visible
        setIsVisible(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    observer.observe(targetElement);

    return () => observer.disconnect();
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop Sticky Form - Right Side */}
      <div className="hidden lg:block fixed right-4 top-1/2 transform -translate-y-1/2 z-50 w-96 max-h-[90vh] overflow-y-auto">
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-2xl">
          <div className="p-1">
            <Form />
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA - Bottom */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
        <button
          onClick={() => {
            document.getElementById('lead-form')?.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          }}
          className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
        >
          Get Free Quote Now
        </button>
      </div>
    </>
  );
}
