import Card from "../components/ui/Card";
import SectionTitle from "../components/ui/SectionTitle";

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Mesa de madera",
    price: "120€",
    image: "https://via.placeholder.com/300x200.png?text=Mesa",
    category: "Muebles",
  },
  {
    id: 2,
    name: "Silla de comedor",
    price: "45€",
    image: "https://via.placeholder.com/300x200.png?text=Silla",
    category: "Muebles",
  },
  {
    id: 3,
    name: "Jarrón decorativo",
    price: "25€",
    image: "https://via.placeholder.com/300x200.png?text=Jarron",
    category: "Decoración",
  },
  {
    id: 4,
    name: "Lámpara de pie",
    price: "60€",
    image: "https://via.placeholder.com/300x200.png?text=Lampara",
    category: "Decoración",
  },
];

const categories = [...new Set(products.map((p) => p.category))];

export default function CatalogoPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">
        Catálogo 🛒
      </h1>

      {categories.map((cat) => (
        <section key={cat} className="mb-12">
          <SectionTitle>{cat}</SectionTitle>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {products
              .filter((p) => p.category === cat)
              .map((p) => (
                <Card
                  key={p.id}
                  title={p.name}
                  price={p.price}
                  category={p.category}
                  image={p.image}
                />
              ))}
          </div>
        </section>
      ))}
    </main>
  );
}
