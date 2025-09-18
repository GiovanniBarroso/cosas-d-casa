import Link from "next/link";
import { MessageCircle, ShoppingBag } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-12 text-center">
      <header className="mb-10">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-800 sm:text-6xl">
          Cosas D Casa 🏡
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Catálogo local de productos únicos para tu hogar.
          Encuentra lo que necesitas de manera rápida, sencilla y cercana.
        </p>
      </header>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Botón WhatsApp */}
        <a
          href="https://wa.me/34XXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
        >
          <MessageCircle size={20} />
          Escríbenos por WhatsApp
        </a>

        {/* Botón catálogo */}
        <Link
          href="/catalogo"
          aria-label="Ir al catálogo de productos"
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          <ShoppingBag size={20} />
          Ver catálogo
        </Link>
      </div>
    </main>
  );
}
