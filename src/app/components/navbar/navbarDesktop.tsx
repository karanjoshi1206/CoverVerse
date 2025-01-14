import { NavList } from "@/constants/navlist";
import Link from "next/link";
import React from "react";

const NavbarDesktop = () => {
  const isLoggedIn = true;
  if (isLoggedIn)
    return (
      <ul className="flex gap-6">
        {NavList.map((navItem) => (
          <li key={navItem.href}>
            <Link href={navItem.href} className="relative px-1 text-muted-foreground hover:text-primary transition-colors duration-200">
              {navItem.name}
              <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary transition-all duration-300 hover:w-full"></span>
            </Link>
          </li>
        ))}
      </ul>
    );

  return (
    <ul className="">
      <Link href="/login" className="relative px-1 text-muted-foreground hover:text-primary transition-colors duration-200">
        Login
        <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary transition-all duration-300 hover:w-full"></span>
      </Link>
    </ul>
  );
};

export default NavbarDesktop;
