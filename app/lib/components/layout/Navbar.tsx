import { Link } from '@remix-run/react';

export default function Navbar() {
  return (
    <nav className="border-b border-gray-300 bg-white px-5 lg:px-8">
      <div className="mx-auto flex h-16 items-center">
        <Link to="/" className="text-2xl font-semibold">
          Signals feed
        </Link>
      </div>
    </nav>
  );
}
