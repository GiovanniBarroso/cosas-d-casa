export type Product = {
    id: number
    name: string
    price: string
    image: string
    category: string
    description: string
}

export const products: Product[] = [
    {
        id: 1,
        name: "Mesa de madera",
        price: "120€",
        image: "https://via.placeholder.com/600x400.png?text=Mesa",
        category: "Muebles",
        description: "Mesa resistente de madera maciza, ideal para comedor o salón.",
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
        description: "Jarrón elegante para dar estilo a cualquier rincón del hogar.",
    },
    {
        id: 4,
        name: "Lámpara de pie",
        price: "60€",
        image: "https://via.placeholder.com/600x400.png?text=Lampara",
        category: "Decoración",
        description: "Lámpara de pie con luz cálida, perfecta para crear ambiente.",
    },
]
