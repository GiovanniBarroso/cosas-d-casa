import { notFound } from "next/navigation";
import Button from "@/app/components/ui/Button";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  description: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Mesa de madera",
    price: "120€",
    image: "https://via.placeholder.com/600x400.png?text=Mesa",
    category: "Muebles",
    description:
      "Mesa resistente de madera maciza, ideal para comedor o salón.",
  },
  {
    id: 2,
    name: "Silla de comedor",
    price: "45€",
    image: "https://via.placeholder.com/600x400.png?text=Silla",
    category: "Muebles",
    description: "Silla cómoda con diseño moderno y acabado en tela.",
  },
  {
    id: 3,
    name: "Jarrón decorativo",
    price: "25€",
    image: "https://via.placeholder.com/600x400.png?text=Jarron",
    category: "Decoración",
    description:
      "Jarrón elegante para dar estilo a cualquier rincón del hogar.",
  },
  {
    id: 4,
    name: "Lámpara de pie",
    price: "60€",
    image: "https://via.placeholder.com/600x400.png?text=Lampara",
    category: "Decoración",
    description: "Lámpara de pie con luz cálida, perfecta para crear ambiente.",
  },
];

// 🔑 Next pre-generará todas estas rutas estáticas
export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    return notFound();
  }

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
            href={`https://wa.me/34XXXXXXXXX?text=Hola! Estoy interesado en el producto: ${product.name}`}
          >
            Comprar por WhatsApp
          </Button>
        </div>
      </div>
    </main>
  );
}
