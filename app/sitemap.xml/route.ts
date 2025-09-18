import { supabase } from "@/lib/supabaseClient";

function getBaseUrl() {
    const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (envUrl) return envUrl.replace(/\/$/, "");
    const vercel = process.env.VERCEL_URL;
    if (vercel) return `https://${vercel}`;
    return "http://localhost:3000";
}

export async function GET() {
    const base = getBaseUrl();
    const isProd =
        process.env.VERCEL_ENV === "production" ||
        process.env.NODE_ENV === "production";

    // rutas estáticas
    const staticRoutes = [
        { url: `${base}/`, changefreq: "weekly", priority: 1 },
        { url: `${base}/catalogo`, changefreq: "weekly", priority: 0.8 },
    ];

    let productRoutes: { url: string; changefreq: string; priority: number }[] =
        [];

    if (isProd) {
        const { data } = await supabase
            .from("products")
            .select("id")
            .limit(1000);

        if (data) {
            productRoutes = data.map((p: { id: string | number }) => ({
                url: `${base}/catalogo/${p.id}`,
                changefreq: "monthly",
                priority: 0.6,
            }));
        }
    }

    const urls = [...staticRoutes, ...productRoutes];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
            .map(
                (u) => `<url>
  <loc>${u.url}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
  <changefreq>${u.changefreq}</changefreq>
  <priority>${u.priority}</priority>
</url>`
            )
            .join("")}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
