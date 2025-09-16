import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-white to-gray-100 p-6">
      <h1 className="text-5xl font-bold text-gray-800 mb-6 text-center">
        Cosas D Casa 🏡
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
        Catálogo local de productos únicos para tu hogar. Encuentra lo que
        necesitas de manera rápida y sencilla.
      </p>
      <a
        href="https://wa.me/34XXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition"
      >
        Escríbenos por WhatsApp
      </a>
      <Link
        href="/catalogo"
        className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition"
      >
        Ver catálogo
      </Link>
    </main>
  );
}
