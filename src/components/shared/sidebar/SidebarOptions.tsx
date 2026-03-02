import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkItem = {
  href: string;
  label: string;
};

export const SidebarOptions = ({ links }: { links: LinkItem[] }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2">
      {links?.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`group relative flex items-center w-full rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 overflow-hidden ${
              isActive 
                ? "bg-success/10 text-success shadow-[inset_0_0_20px_rgba(34,197,94,0.05)]" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {/* Active Indicator Bar */}
            {isActive && (
              <div className="absolute left-0 top-0 h-full w-1 bg-success shadow-[0_0_15px_rgba(34,197,94,0.8)]"></div>
            )}
            
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
              {link.label}
            </span>
            
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>
        );
      })}
    </div>
  );
};
