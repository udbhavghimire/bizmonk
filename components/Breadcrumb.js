import Link from "next/link";

export default function Breadcrumb({ items }) {
  return (
    <nav className="mb-8">
      <ol className="flex items-center space-x-2 text-gray-500">
        <li>
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            {item.href ? (
              <Link
                href={item.href}
                className="ml-2 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="ml-2 text-gray-900">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
