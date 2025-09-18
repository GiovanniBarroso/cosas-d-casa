import Link from "next/link";
import Button from "./components/ui/Button";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-12 text-center">
      <div role="alert" className="max-w-md">
        <SearchX
          size={56}
          className="mx-auto mb-6 text-gray-400"
          aria-hidden="true"
        />
        <h1 className="mb-3 text-6xl font-extrabold text-gray-800">404</h1>
        <p className="mb-8 text-lg text-gray-600">
          Oops... La página que buscas no existe o fue movida.
        </p>

        <div className="flex flex-col items-center gap-4">
          <Button variant="primary" href="/">
            Volver al inicio
          </Button>
          <Link
            href="/catalogo"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Ir al catálogo 🛒
          </Link>
        </div>
      </div>
    </main>
  );
}
