'use client';

import { Facebook, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-slate-900 text-white py-12 px-6 text-sm"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Logo + slogan */}
        <div>
          <h3 className="text-xl font-bold mb-2">Best Deal Roofing</h3>
          <p className="text-gray-400">
            Protecting homes across the U.S. with top-tier roofing services and trusted professionals.
          </p>
        </div>

        {/* Contact info */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Contact</h4>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-yellow-400" />
              (000) 000-0000
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-yellow-400" />
              contact@bestdealroofing.xyz
            </li>
          </ul>
        </div>

        {/* Links / redes */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
          <div className="flex gap-4 text-gray-300">
            <a
              href="#"
              className="hover:text-yellow-400 transition"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            {/* Puedes agregar más redes aquí */}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700 mt-10 pt-6 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Best Deal Roofing. All rights reserved.

        <p className="mt-2">
          Designed by{" "}
          <a
            href="https://wa.me/573107736703?text=Hola%2C+quiero+una+landing+como+la+de+Best+Deal+Roofing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 hover:underline"
          >
            JuSeb SOFTWARE
          </a> Do you want a landing like this? Write us.
        </p>
      </div>
    </footer>
  );
}
