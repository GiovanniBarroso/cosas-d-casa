"use client";

import { useMemo, useState } from "react";
import Card from "@/app/components/ui/Card";
import { formatPrice } from "@/utils/formatPrice";

type Category = { id: string; name: string };
type Product = {
    id: string;
    name: string;
    price_cents: number;
    image: string | null;
    category_id: string;
};

export default function CatalogGrid({
    categories,
    products,
}: {
    categories: Category[];
    products: Product[];
}) {
    const [categoryId, setCategoryId] = useState<string>("all");
    const [query, setQuery] = useState<string>("");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return products.filter((p) => {
            const byCat = categoryId === "all" || p.category_id === categoryId;
            const byQuery = !q || p.name.toLowerCase().includes(q);
            return byCat && byQuery;
        });
    }, [products, categoryId, query]);

    const grouped = useMemo(() => {
        const map = new Map<string, Product[]>();
        for (const p of filtered) {
            const key = p.category_id;
            if (!map.has(key)) map.set(key, []);
            map.get(key)!.push(p);
        }
        return map;
    }, [filtered]);

    return (
        <>
            {/* Controles */}
            <div className="max-w-5xl mx-auto mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                >
                    <option value="all">Todas las categorías</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar producto…"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm sm:col-span-2"
                />
            </div>

            {/* Grids por categoría */}
            <div className="max-w-6xl mx-auto">
                {(categoryId === "all" ? categories : categories.filter((c) => c.id === categoryId))
                    .map((cat) => {
                        const prods = grouped.get(cat.id) ?? [];
                        if (!prods.length) return null;

                        return (
                            <section key={cat.id} className="mb-12">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">{cat.name}</h2>
                                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                    {prods.map((p) => (
                                        <Card
                                            key={p.id}
                                            id={p.id}
                                            title={p.name}
                                            price={formatPrice(p.price_cents)}
                                            category={cat.name}
                                            image={p.image ?? undefined}
                                        />
                                    ))}
                                </div>
                            </section>
                        );
                    })}
            </div>

            {/* Vacío */}
            {!filtered.length && (
                <div className="min-h-[30vh] flex items-center justify-center">
                    <p className="text-gray-500">No hay resultados para tu búsqueda.</p>
                </div>
            )}
        </>
    );
}
