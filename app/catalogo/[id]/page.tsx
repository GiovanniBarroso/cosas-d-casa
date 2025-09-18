// app/catalogo/[id]/page.tsx
import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { formatPrice } from "@/utils/formatPrice";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const { data, error } = await supabase.from("products").select("id");
  if (error || !data) return [];
  return data.map((p) => ({ id: String(p.id) }));
}

type ProductDetail = {
  id: string;
  name: string;
  price_cents: number;
  image: string | null;
  description: string | null;
  category: { name: string } | null;
};

// --- SEO por producto ---
// En Next 15, params puede ser Promise, así que lo tipamos y hacemos await
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;

  const { data } = await supabase
    .from("products")
    .select("name, description, image")
    .eq("id", id)
    .maybeSingle();

  const title = data?.name ? `${data.name} | Cosas D Casa` : "Producto | Cosas D Casa";
  const description =
    data?.description?.slice(0, 155) ??
    "Descubre nuestros productos artesanales en Cosas D Casa.";
  const images = data?.image ? [data.image] : [];

  return {
    title,
    description,
    openGraph: { title, description, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

// --- Config CTA (rellena tus ENV) ---
const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "34600000000";
const TEL_LINK = process.env.NEXT_PUBLIC_PHONE_TEL ?? "tel:+34600000000";
const MAPS_URL =
  process.env.NEXT_PUBLIC_MAPS_URL ??
  "https://maps.google.com/?q=Cosas%20D%20Casa";

export default async function ProductDetailPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data: product, error } = await supabase
    .from("products")
    .select("id, name, price_cents, image, description, category:categories(name)")
    .eq("id", id)
    .single<ProductDetail>();

  if (error || !product) {
    notFound();
  }

  const price = formatPrice(product.price_cents);

  // JSON-LD
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cosas-d-casa.vercel.app";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? "",
    image: product.image ? [product.image] : [],
    category: product.category?.name ?? "",
    url: `${baseUrl}/catalogo/${product.id}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: (product.price_cents / 100).toFixed(2),
      availability: "https://schema.org/InStock",
      url: `${baseUrl}/catalogo/${product.id}`,
    },
  };

  // WhatsApp prellenado
  const waText = encodeURIComponent(
    `Hola, me interesa el producto "${product.name}" (${price}). ¿Podemos hablar?`
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waText}`;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={800}
            height={600}
            sizes="(min-width: 1024px) 800px, 100vw"
            className="w-full h-96 object-cover"
            priority
          />
        ) : (
          <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-500">
            Sin imagen
          </div>
        )}

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
          <p className="text-green-600 font-bold text-xl mb-4">{price}</p>

          <p className="text-sm text-gray-500 mb-6">
            {product.category?.name ?? "Sin categoría"}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {product.description || "Sin descripción disponible."}
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              WhatsApp
            </a>
            <a
              href={TEL_LINK}
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Llamar
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-black transition"
            >
              Cómo llegar
            </a>
          </div>

          <Link
            href="/catalogo"
            className="inline-block px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition"
          >
            ← Volver al catálogo
          </Link>
        </div>
      </div>
    </main>
  );
}
