import Link from "next/link";
import Button from "./Button";
import Image from "next/image";

type CardProps = {
  id: number;
  title: string;
  price: string;
  category: string;
  image: string;
};

export default function Card({ id, title, price, category, image }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col">
      <Link href={`/catalogo/${id}`}>
        <Image
          src={image}
          alt={title}
          width={300}
          height={200}
          className="w-full h-40 object-cover"
        />
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
