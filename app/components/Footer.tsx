import { Instagram, MessageCircle, Music } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t border-gray-200 bg-gray-50 text-gray-600"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 text-sm sm:flex-row">
        {/* Derechos reservados */}
        <p className="text-center sm:text-left">
          © {year} <span className="font-semibold">Cosas D Casa</span>. Hecho con{" "}
          <span aria-hidden>❤️</span> en España
        </p>

        {/* Bloque de enlaces */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
          {/* Enlaces legales */}
          <nav aria-label="Enlaces legales">
            <ul className="flex gap-4">
              <li>
                <a
                  href="#"
                  className="hover:text-gray-800 transition-colors"
                >
                  Aviso legal
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-800 transition-colors"
                >
                  Política de privacidad
                </a>
              </li>
            </ul>
          </nav>

          {/* Redes sociales */}
          <nav aria-label="Redes sociales">
            <ul className="flex gap-4">
              <li>
                <a
                  href="https://wa.me/34XXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                  className="text-gray-500 transition-colors hover:text-green-600"
                >
                  <MessageCircle size={20} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@usuario"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  title="TikTok"
                  className="text-gray-500 transition-colors hover:text-black"
                >
                  <Music size={20} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/usuario"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                  className="text-gray-500 transition-colors hover:text-pink-600"
                >
                  <Instagram size={20} />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
