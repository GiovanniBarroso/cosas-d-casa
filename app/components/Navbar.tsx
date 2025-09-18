"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, MessageCircle, Instagram, Music } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold text-gray-800 hover:text-blue-600 sm:text-xl"
        >
          Cosas D Casa 🏡
        </Link>

        {/* Links desktop */}
        <div className="hidden items-center gap-6 sm:flex">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Inicio
          </Link>
          <Link
            href="/catalogo"
            className="hover:text-blue-600 transition-colors"
          >
            Catálogo
          </Link>

          {/* Redes sociales (desktop) */}
          <div className="ml-4 flex items-center gap-3 text-gray-500">
            <a
              href="https://wa.me/34XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-green-600 transition-colors"
            >
              <MessageCircle size={20} />
            </a>
            <a
              href="https://www.tiktok.com/@usuario"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="hover:text-black transition-colors"
            >
              <Music size={20} />
            </a>
            <a
              href="https://www.instagram.com/usuario"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-pink-600 transition-colors"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Botón móvil */}
        <button
          onClick={toggleMenu}
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="sm:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu móvil */}
      {open && (
        <div
          id="mobile-menu"
          className="sm:hidden border-t border-gray-200 bg-white px-4 py-4"
        >
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 hover:bg-gray-50 hover:text-blue-600"
            >
              Inicio
            </Link>
            <Link
              href="/catalogo"
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 hover:bg-gray-50 hover:text-blue-600"
            >
              Catálogo
            </Link>

            {/* Redes sociales (mobile) */}
            <div className="mt-4 flex gap-4 text-gray-500">
              <a
                href="https://wa.me/34XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="hover:text-green-600"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@usuario"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="hover:text-black"
              >
                <Music size={20} />
              </a>
              <a
                href="https://www.instagram.com/usuario"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-pink-600"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
