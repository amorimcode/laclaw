import { useTranslations } from "next-intl";
import Link from "next/link";

const Header = () => {
  const t = useTranslations("HEADER");

  return (
    <header className="bg-zinc-950 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <img
          className="w-20"
          src="https://laclaw.com.br/wp-content/uploads/2020/06/logo-ass-contraste.svg"
        />

        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-white hover:text-gray-200">
                {t("OPTIONS.HOME")}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
