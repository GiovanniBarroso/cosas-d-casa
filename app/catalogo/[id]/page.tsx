// app/catalogo/[id]/page.tsx
import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { formatPrice } from "@/utils/formatPrice";
import Button from "@/app/components/ui/Button";
import { Phone, MapPin, MessageCircle } from "lucide-react";

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

// --- SEO ---
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

// --- Config CTA ---
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

  if (error || !product) notFound();

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
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto grid max-w-5xl gap-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-2">
        {/* Imagen */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-500">
              <span className="sr-only">Sin imagen disponible</span>
              Sin imagen
            </div>
          )}
        </div>

        {/* Detalles */}
        <div className="flex flex-col">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mb-4 text-xl font-semibold text-green-600">{price}</p>
          <p className="mb-6 text-sm text-gray-500">
            {product.category?.name ?? "Sin categoría"}
          </p>

          <p className="mb-6 text-gray-700 leading-relaxed">
            {product.description || "Sin descripción disponible."}
          </p>

          {/* CTAs */}
          <div className="mb-8 flex flex-wrap gap-3">
            <Button
              href={waLink}
              variant="whatsapp"
              aria-label="Contactar por WhatsApp"
              iconLeft={<MessageCircle size={18} />}
            >
              WhatsApp
            </Button>
            <Button
              href={TEL_LINK}
              variant="primary"
              aria-label="Llamar por teléfono"
              iconLeft={<Phone size={18} />}
            >
              Llamar
            </Button>
            <Button
              href={MAPS_URL}
              variant="secondary"
              aria-label="Cómo llegar"
              iconLeft={<MapPin size={18} />}
            >
              Cómo llegar
            </Button>
          </div>

          <Link
            href="/catalogo"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            ← Volver al catálogo
          </Link>
        </div>
      </div>
    </main>
  );
}
