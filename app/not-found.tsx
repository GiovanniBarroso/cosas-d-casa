import Link from "next/link";
import Button from "./components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-8">
        Oops... La página que buscas no existe o fue movida.
      </p>
      <div className="space-y-4">
        <Button variant="primary" href="/">
          Volver al inicio
        </Button>
        <Link href="/catalogo" className="block text-blue-600 hover:underline">
          Ir al catálogo 🛒
        </Link>
      </div>
    </main>
  );
}
