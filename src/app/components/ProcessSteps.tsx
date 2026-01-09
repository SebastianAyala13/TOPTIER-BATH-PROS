'use client';

import { CheckCircle, Pencil, Ruler, ShowerHead } from 'lucide-react';

export default function ProcessSteps() {
  const steps = [
    {
      icon: <Pencil className="w-8 h-8 text-teal-600" />,
      title: 'Design Consultation',
      desc: 'We align style, layout, and budget with your goals.',
      cta: 'Plan my bathroom',
    },
    {
      icon: <Ruler className="w-8 h-8 text-teal-600" />,
      title: 'Materials & Permits',
      desc: 'We help you pick durable finishes and handle permits.',
      cta: 'Choose finishes',
    },
    {
      icon: <ShowerHead className="w-8 h-8 text-teal-600" />,
      title: 'Installation',
      desc: 'Certified installers complete the work cleanly and on time.',
      cta: 'Schedule install',
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-teal-600" />,
      title: 'Final Walkthrough',
      desc: 'We verify every detail and deliver your new bathroom.',
      cta: 'Get my quote',
    },
  ];

  return (
    <section className="py-20 px-4 bg-teal-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-10 text-center">Our 4-step process</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 text-center">
              <div className="flex justify-center mb-3">{s.icon}</div>
              <h3 className="font-semibold text-slate-800 mb-1">{s.title}</h3>
              <p className="text-sm text-slate-600">{s.desc}</p>
              <a href="#form-section" className="inline-block mt-4 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-lg">
                ✏️ Fill Form - {s.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


