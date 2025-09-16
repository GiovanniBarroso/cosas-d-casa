"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-lg sm:text-xl font-bold text-gray-800">
          Cosas D Casa 🏡
        </Link>

        {/* Botón móvil */}
        <button
          className="sm:hidden text-gray-600 focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        {/* Links desktop */}
        <div className="hidden sm:flex space-x-6">
          <Link href="/" className="hover:text-blue-600">
            Inicio
          </Link>
          <Link href="/catalogo" className="hover:text-blue-600">
            Catálogo
          </Link>
        </div>
      </div>

      {/* Menu móvil */}
      {open && (
        <div className="sm:hidden px-4 pb-4 space-y-2">
          <Link href="/" className="block hover:text-blue-600">
            Inicio
          </Link>
          <Link href="/catalogo" className="block hover:text-blue-600">
            Catálogo
          </Link>
        </div>
      )}
    </nav>
  );
}
