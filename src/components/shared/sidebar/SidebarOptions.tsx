import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkItem = {
  href: string;
  label: string;
};

export const SidebarOptions = ({ links }: { links: LinkItem[] }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-1">
      {links?.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`block w-full rounded-md px-3 py-2 ${
              isActive ? "bg-orange-600 text-white" : ""
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
};
