import { notFound } from "next/navigation";
import Image from "next/image";
import Button from "@/app/components/ui/Button";
import { products } from "@/app/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = products.find((x) => x.id === Number(id));
  if (!p) return { title: "Producto no encontrado · Cosas D Casa" };
  return {
    title: `${p.name} · Cosas D Casa`,
    description: p.description,
    openGraph: {
      title: `${p.name} · Cosas D Casa`,
      description: p.description,
      images: [p.image],
    },
  };
}

// En Next 15, params es Promise en build: página async y await
export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));
  if (!product) return notFound();

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={400}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {product.name}
          </h1>
          <p className="text-green-600 font-bold text-xl mb-2">
            {product.price}
          </p>
          <p className="text-sm text-gray-500 mb-4">{product.category}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <Button
            variant="whatsapp"
            href={`https://wa.me/34XXXXXXXXX?text=Hola!%20Estoy%20interesado%20en%20el%20producto:%20${encodeURIComponent(
              product.name
            )}`}
          >
            Comprar por WhatsApp
          </Button>
        </div>
      </div>
    </main>
  );
}
