import Card from "../components/ui/Card";
import SectionTitle from "../components/ui/SectionTitle";
import { products } from "../data/products";

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
                  id={p.id}
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
