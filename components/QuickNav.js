import Link from "next/link";

export default function QuickNav() {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <Link href="/" className="text-gray-600 hover:text-primary">
            Home
          </Link>
          <Link
            href="/franchise-opportunity/all"
            className="text-gray-600 hover:text-primary"
          >
            All Franchises
          </Link>
          <Link
            href="/franchise-opportunity/toronto"
            className="text-gray-600 hover:text-primary"
          >
            Toronto
          </Link>
          <Link
            href="/franchise-opportunity/mississauga"
            className="text-gray-600 hover:text-primary"
          >
            Mississauga
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-primary">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
