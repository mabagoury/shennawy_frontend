import Link from 'next/link';
import { Home } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm mb-[2vh]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center text-2xl font-semibold text-gray-800">
            <Home className="text-orange-500 mr-2" />
            Real Estate Hub
          </Link>
        </div>
      </div>
    </header>
  );
}
