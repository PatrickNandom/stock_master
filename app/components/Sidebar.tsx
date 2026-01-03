import Link from "next/link";

const links = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Sales", href: "/dashboard/sales" },
  { label: "Items", href: "/dashboard/items" },
  { label: "Notifications", href: "/dashboard/notifications" },
  { label: "History", href: "/dashboard/history" },
  { label: "Store Profile", href: "/dashboard/store-profile" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 hidden sm:block bg-white border-r">
      <Link href="/">
        <div className="p-6 font-bold text-xl">S</div>
      </Link>

      <nav className="space-y-2 px-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block px-4 py-2 rounded hover:bg-gray-100"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
