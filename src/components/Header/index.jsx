import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-blue-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">
          <Link href="/">My App</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-white hover:text-gray-200">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-white hover:text-gray-200">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-white hover:text-gray-200">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
