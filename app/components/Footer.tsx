import { FaWhatsapp, FaTiktok, FaInstagram } from "react-icons/fa";
import ReactCountryFlag from "react-country-flag";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t border-gray-200 bg-gray-50 text-gray-600 
                 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 text-sm sm:grid-cols-3 sm:items-center">
        {/* Branding */}
        <div className="text-center sm:text-left">
          <p className="text-base font-semibold text-gray-800 dark:text-gray-200">
            Cosas D Casa
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex justify-center sm:justify-start items-center">
            Productos artesanales realizados en España
            <span className="ml-2 inline-block align-middle">
              <ReactCountryFlag
                countryCode="ES"
                svg
                style={{ width: "1.25em", height: "1.25em" }}
              />
            </span>
          </p>
          <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
            © {year} · Todos los derechos reservados
          </p>
        </div>

        {/* Enlaces legales */}
        <nav
          aria-label="Enlaces legales"
          className="flex justify-center sm:justify-center"
        >
          <ul className="flex flex-col gap-2 sm:flex-row sm:gap-6">
            <li>
              <a
                href="#"
                className="text-gray-500 transition-colors hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:text-gray-200"
              >
                Aviso legal
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-500 transition-colors hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:text-gray-200"
              >
                Política de privacidad
              </a>
            </li>
          </ul>
        </nav>

        {/* Redes sociales */}
        <nav
          aria-label="Redes sociales"
          className="flex justify-center sm:justify-end"
        >
          <ul className="flex gap-4">
            <li>
              <a
                href="https://wa.me/34696787146"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chatea con nosotros en WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-green-50 hover:text-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 dark:bg-gray-800 dark:hover:bg-green-900"
              >
                <FaWhatsapp size={18} />
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@cosasdcasasevilla"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en TikTok"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <FaTiktok size={18} />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/_cosas_d_casa_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-pink-50 hover:text-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 dark:bg-gray-800 dark:hover:bg-pink-900"
              >
                <FaInstagram size={18} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
