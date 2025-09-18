import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabaseClient";

function getBaseUrl() {
    const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (envUrl) return envUrl.replace(/\/$/, "");
    const vercel = process.env.VERCEL_URL;
    if (vercel) return `https://${vercel}`;
    return "http://localhost:3000";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const base = getBaseUrl();
    const isProd =
        process.env.VERCEL_ENV === "production" ||
        process.env.NODE_ENV === "production";

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${base}/`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${base}/catalogo`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
    ];

    // En dev/preview: evita listar dinámicos (para no publicar URLs locales)
    if (!isProd) return staticRoutes;

    const { data, error } = await supabase
        .from("products")
        .select("id, updated_at")
        .order("updated_at", { ascending: false })
        .limit(1000);

    const productRoutes: MetadataRoute.Sitemap =
        error || !data
            ? []
            : data.map((p: { id: string; updated_at?: string | null }) => ({
                url: `${base}/catalogo/${p.id}`,
                lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
                changeFrequency: "monthly",
                priority: 0.6,
            }));

    return [...staticRoutes, ...productRoutes];
}
