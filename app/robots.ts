import type { MetadataRoute } from "next";

function getBaseUrl() {
    const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (envUrl) return envUrl.replace(/\/$/, "");
    const vercel = process.env.VERCEL_URL;
    if (vercel) return `https://${vercel}`;
    return "http://localhost:3000";
}

export default function robots(): MetadataRoute.Robots {
    const site = getBaseUrl();
    const isProd =
        process.env.VERCEL_ENV === "production" ||
        process.env.NODE_ENV === "production";

    // En dev/preview bloqueamos indexación por seguridad
    const rules = isProd
        ? [{ userAgent: "*", allow: ["/"], disallow: ["/admin", "/api/*"] }]
        : [{ userAgent: "*", disallow: ["/"] }];

    return {
        rules,
        sitemap: isProd ? `${site}/sitemap.xml` : undefined,
    };
}
