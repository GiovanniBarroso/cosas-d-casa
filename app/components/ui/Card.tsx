import Link from "next/link";
import Image from "next/image";
import Button from "./Button";

type CardProps = {
  id: string;
  title: string;
  price: string;
  category: string;
  image?: string | null;
};

export default function Card({ id, title, price, category, image }: CardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg">
      {/* Imagen */}
      <Link
        href={`/catalogo/${id}`}
        aria-label={`Ver detalle de ${title}`}
        className="relative block h-40 w-full overflow-hidden"
      >
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
            Sin imagen
          </div>
        )}
      </Link>

      {/* Contenido */}
      <div className="flex flex-grow flex-col p-4">
        <Link
          href={`/catalogo/${id}`}
          className="group mb-1 inline-block"
        >
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
        </Link>

        <p className="text-green-600 font-bold">{price}</p>
        <p className="mb-4 text-sm text-gray-500">{category}</p>

        {/* CTA */}
        <div className="mt-auto">
          <Button variant="secondary" href={`/catalogo/${id}`}>
            Ver detalle
          </Button>
        </div>
      </div>
    </article>
  );
}
