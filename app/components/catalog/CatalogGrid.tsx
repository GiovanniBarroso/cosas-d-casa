"use client";

import { useMemo, useState } from "react";
import Card from "@/app/components/ui/Card";
import SectionTitle from "@/app/components/ui/SectionTitle";
import { formatPrice } from "@/utils/formatPrice";
import { Search } from "lucide-react";

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
            const byCat =
                categoryId === "all" || String(p.category_id) === String(categoryId);
            const byQuery = !q || p.name.toLowerCase().includes(q);
            return byCat && byQuery;
        });
    }, [products, categoryId, query]);

    const grouped = useMemo(() => {
        const map = new Map<string, Product[]>();
        for (const p of filtered) {
            const key = String(p.category_id);
            if (!map.has(key)) map.set(key, []);
            map.get(key)!.push(p);
        }
        return map;
    }, [filtered]);

    return (
        <>
            {/* Controles */}
            <div className="sticky top-16 z-10 mx-auto mb-8 grid max-w-5xl grid-cols-1 gap-3 bg-gray-50/80 px-4 py-3 backdrop-blur sm:grid-cols-3 sm:rounded-xl sm:border sm:border-gray-200">
                <label className="sr-only" htmlFor="category">
                    Filtrar por categoría
                </label>
                <select
                    id="category"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
                >
                    <option value="all">Todas las categorías</option>
                    {categories.map((c) => (
                        <option key={c.id} value={String(c.id)}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <div className="relative sm:col-span-2">
                    <label className="sr-only" htmlFor="search">
                        Buscar producto
                    </label>
                    <input
                        id="search"
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar producto…"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm pr-9 focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
                    />
                    <Search
                        size={18}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        aria-hidden="true"
                    />
                </div>
            </div>

            {/* Grids por categoría */}
            <div className="mx-auto max-w-6xl px-4">
                {(categoryId === "all"
                    ? categories
                    : categories.filter((c) => String(c.id) === String(categoryId))
                ).map((cat) => {
                    const prods = grouped.get(String(cat.id)) ?? [];
                    if (!prods.length) return null;

                    return (
                        <section key={cat.id} className="mb-12">
                            <SectionTitle as="h2">{cat.name}</SectionTitle>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                <div className="flex min-h-[30vh] items-center justify-center px-4 text-center">
                    <p className="text-gray-500">
                        No hay resultados para tu búsqueda.
                    </p>
                </div>
            )}
        </>
    );
}
