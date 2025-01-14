import React from "react";

import NavbarDesktop from "./navbarDesktop";
import NavbarMobile from "./navbarMobile";
import { APP_NAME } from "@/constants/config";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-4 py-3 bg-background border-b border-border shadow-sm">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-primary">
          <Link href="/">{APP_NAME}</Link>
        </h1>
      </div>

      <div className="hidden md:block">
        <NavbarDesktop />
      </div>
      <div className="block md:hidden">
        <NavbarMobile />
      </div>
    </nav>
  );
};

export default Navbar;
