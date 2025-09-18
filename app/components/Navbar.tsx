"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Cerrar el menú al cambiar de ruta
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Cerrar con tecla Esc
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <nav
      role="navigation"
      aria-label="Principal"
      className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/80"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-extrabold text-gray-800 hover:text-blue-600 sm:text-xl dark:text-gray-100"
        >
          Cosas D Casa <span aria-hidden>🏡</span>
        </Link>

        {/* Links desktop */}
        <div className="hidden items-center gap-6 sm:flex">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={`transition-colors hover:text-blue-600 ${pathname === href
                ? "text-blue-600 font-semibold"
                : "text-gray-700 dark:text-gray-300"
                }`}
            >
              {label}
            </Link>
          ))}

          {/* Toggle de tema en desktop */}
          <ThemeToggle />
        </div>

        {/* Botón menú móvil + Toggle de tema móvil */}
        <div className="flex items-center gap-2 sm:hidden">
          {/* Toggle de tema SIEMPRE visible en móvil */}
          <ThemeToggle />

          <button
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Abrir menú"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        id="mobile-menu"
        className={`sm:hidden origin-top transform border-t border-gray-200 bg-white px-4 transition-all duration-200 dark:border-gray-700 dark:bg-gray-900 ${open
          ? "scale-y-100 opacity-100 py-4"
          : "scale-y-0 opacity-0 h-0 overflow-hidden"
          }`}
      >
        <div className="flex flex-col gap-3">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={`block rounded-md px-3 py-2 transition-colors ${pathname === href
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
