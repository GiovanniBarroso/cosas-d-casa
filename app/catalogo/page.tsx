// app/catalogo/page.tsx
import { supabase } from "@/lib/supabaseClient";
import CatalogGrid from "@/app/components/catalog/CatalogGrid";
import type { Metadata } from "next";
import { PackageX, FolderOpen } from "lucide-react";
import Link from "next/link";

export const revalidate = 60; // ISR

export async function generateMetadata(): Promise<Metadata> {
  const title = "Catálogo | Cosas D Casa";
  const description = "Explora nuestras categorías y productos artesanales.";
  const url = process.env.NEXT_PUBLIC_SITE_URL
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/catalogo`
    : "https://cosas-d-casa.vercel.app/catalogo";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: ["/og-catalogo.jpg"], // 📌 prepara una imagen en /public
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CatalogoPage() {
  const { data: categories, error: catError } = await supabase
    .from("categories")
    .select("id, name")
    .order("name", { ascending: true });

  const { data: products, error: prodError } = await supabase
    .from("products")
    .select("id, name, price_cents, image, category_id")
    .order("name", { ascending: true });

  // Estado de error
  if (catError || prodError) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <div role="alert" className="text-center">
          <PackageX
            size={48}
            className="mx-auto mb-4 text-gray-400"
            aria-hidden="true"
          />
          <h1 className="mb-2 text-xl font-bold text-gray-800">
            No se pudo cargar el catálogo
          </h1>
          <p className="text-gray-600">Inténtalo de nuevo más tarde.</p>
        </div>
      </main>
    );
  }

  // Estado vacío
  if (!categories?.length) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <div role="status" className="text-center">
          <FolderOpen
            size={48}
            className="mx-auto mb-4 text-gray-400"
            aria-hidden="true"
          />
          <h1 className="mb-2 text-xl font-bold text-gray-800">
            Aún no hay categorías
          </h1>
          <p className="text-gray-600">Pronto añadiremos productos 🙂</p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white font-medium shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
          Catálogo 🛒
        </h1>

        <CatalogGrid categories={categories} products={products ?? []} />
      </div>
    </main>
  );
}
