// utils/formatPrice.ts
export const formatPrice = (cents: number) =>
    new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(
        cents / 100
    );
