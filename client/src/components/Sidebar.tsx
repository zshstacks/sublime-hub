"use client";

import { RiBankLine } from "react-icons/ri";
import { MdRadar } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import Link from "next/link";
import { usePathname } from "next/dist/client/components/navigation";

const navItems = [
  { name: "Finance", href: "/hub/finance", icon: <RiBankLine size={20} /> },
  { name: "Uptime Monitor", href: "/hub/monitor", icon: <MdRadar size={20} /> },
  { name: "Crypto Tracker", href: "/hub/crypto", icon: <GoGraph size={19} /> },
];

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-68 flex-col md:flex shadow-md bg-[linear-gradient(180deg,#14202D_0%,#0b1a22_45%,#07141b_100%)]">
      <div className="flex h-16 items-center  px-6 font-bold text-2xl tracking-tight ">
        <Link href="/hub">SublimeHub</Link>
      </div>

      <nav className="flex-1 space-y-2 p-4 ">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              href={item.href}
              key={item.name}
              className={`px-2 py-3 rounded-md cursor-pointer flex gap-4 items-center transition-colors duration-75 group ${isActive ? "bg-[#131A25] " : ""}`}
            >
              <div
                className={`transition-colors ${isActive ? "text-[#38CA6B]" : "group-hover:text-[#38CA6B]"}`}
              >
                {item.icon}
              </div>
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className=" p-6 text-sm text-white border-2">
        <div>User Profile</div>
      </div>
    </aside>
  );
}

export default Sidebar;
