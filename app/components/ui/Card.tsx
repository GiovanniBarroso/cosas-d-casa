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
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col">
      <Link href={`/catalogo/${id}`}>
        {image ? (
          <Image
            src={image}
            alt={title}
            width={300}
            height={200}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="w-full h-40 object-cover"
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
            Sin imagen
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/catalogo/${id}`}>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        </Link>
        <p className="text-green-600 font-bold">{price}</p>
        <p className="text-sm text-gray-500 mb-4">{category}</p>

        <div className="mt-auto">
          <Button variant="secondary" href={`/catalogo/${id}`}>
            Ver detalle
          </Button>
        </div>
      </div>
    </div>
  );
}
