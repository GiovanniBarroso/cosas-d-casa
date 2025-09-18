import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center p-6">
            <div
                role="alert"
                className="max-w-md text-center"
            >
                <SearchX
                    className="mx-auto mb-4 text-gray-400"
                    size={48}
                    aria-hidden="true"
                />
                <h1 className="mb-2 text-2xl font-bold text-gray-800">
                    Producto no encontrado
                </h1>
                <p className="mb-6 text-gray-600">
                    Lo sentimos, el producto que buscas no existe o fue retirado.
                </p>

                <Link
                    href="/catalogo"
                    className="inline-block rounded-lg bg-blue-600 px-5 py-2 text-white font-medium shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                    ← Volver al catálogo
                </Link>
            </div>
        </main>
    );
}
