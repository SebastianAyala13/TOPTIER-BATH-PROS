'use client';

import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-slate-900 text-white py-12 px-6 text-sm"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Logo + slogan */}
        <div>
          <h3 className="text-xl font-bold mb-2">TOPTIER BATH PROS</h3>
          <p className="text-gray-400">
          Bath remodeling in the US with quality standards, design and professional execution.          </p>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Contacto</h4>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-teal-400" />
              <a
                href="mailto:contact@bestdealbathroom.xyz"
                className="hover:text-white transition"
              >
                contact@bestdealbathroom.xyz
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-700 mt-10 pt-6 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} TOPTIER BATH PROS. All rights reserved.

        {/* Compliance Links */}
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs">
          <a href="/privacy-policy" className="text-gray-400 hover:text-white transition">
            {"Privacy Policy"}
          </a>
          <a href="/terms-and-conditions" className="text-gray-400 hover:text-white transition">
            {"Terms & Conditions"}
          </a>
          <a href="/partners" className="text-gray-400 hover:text-white transition">
            {"Partners"}
          </a>
        </div>

        {/* Developer credit */}
        <p className="mt-4 text-gray-400">
          Designed by{" "}
          <a
            href="https://ju-seb-software-xqw5.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:underline"
          >
            JuSeb SOFTWARE
          </a>{" "}
          —
          <a
            href="https://wa.me/573107736703?text=Hola%2C+quiero+una+landing+como+la+de+Best+Deal+Roofing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:underline ml-1"
          >
            Request via WhatsApp
          </a>
        </p>
      </div>
    </footer>
  );
}
// Footer updated to include JuSeb link and WhatsApp contact
