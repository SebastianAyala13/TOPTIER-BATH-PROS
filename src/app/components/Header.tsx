'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext'; // Asegúrate que esta ruta sea correcta

export default function Header() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + nombre */}
        <Link href="/" scroll={false}>
          <div className="flex items-center space-x-3 cursor-pointer">
            <Image
              src="/logobestdeal.png"
              alt="TOPTIER BATH PROS logo"
              width={50}
              height={50}
              priority
            />
            <div className="text-slate-900">
              <p className="text-lg font-extrabold leading-none">TOPTIER</p>
              <p className="text-sm font-light uppercase tracking-wide -mt-1">BATH PROS</p>
            </div>
          </div>
        </Link>

        {/* Menú + idioma */}
          <div className="flex items-center space-x-6">
            <nav className="hidden sm:flex space-x-6 text-sm text-slate-700 font-medium">
              <a href="#form-section" className="hover:text-teal-500 transition">
                Bathroom Quote
              </a>
              <a href="#benefits" className="hover:text-teal-500 transition">
                Why Us
              </a>
              <a href="#projects" className="hover:text-teal-500 transition">
                Bathrooms
              </a>
              <a href="#footer" className="hover:text-teal-500 transition">
                Contact
              </a>
            </nav>

            {/* Language toggle disabled for EN-only site */}
          </div>

      </div>
    </header>
  );
}
    