// app/catalogo/page.tsx
import { supabase } from "@/lib/supabaseClient";
import CatalogGrid from "@/app/components/catalog/CatalogGrid";
import type { Metadata } from "next";

export const revalidate = 60; // ISR

export async function generateMetadata(): Promise<Metadata> {
  const title = "Catálogo | Cosas D Casa";
  const description = "Explora nuestras categorías y productos artesanales.";
  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: "summary", title, description },
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

  if (catError || prodError) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <p className="text-gray-500">No se pudo cargar el catálogo.</p>
      </main>
    );
  }

  if (!categories?.length) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <p className="text-gray-500">Aún no hay categorías.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Catálogo 🛒</h1>

      <CatalogGrid
        categories={categories}
        products={products ?? []}
      />
    </main>
  );
}
