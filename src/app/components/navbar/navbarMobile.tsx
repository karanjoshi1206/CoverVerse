import { Button } from "@/components/ui/button";

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { APP_DESCRIPTION, APP_NAME } from "@/constants/config";
import { NavList } from "@/constants/navlist";
import { Menu } from "lucide-react";
import Link from "next/link";

function NavbarMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="rounded-full">
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{APP_NAME}</SheetTitle>
          <SheetDescription>{APP_DESCRIPTION}</SheetDescription>
        </SheetHeader>
        <ul className="flex flex-col gap-4 mt-4">
          {NavList.map((navItem) => (
            <li key={navItem.href} className="relative group">
              <Link href={navItem.href} className="block px-3 py-2 rounded-md text-muted-foreground bg-transparent hover:bg-accent hover:text-accent-foreground transition-colors duration-200">
                {navItem.name}
              </Link>
              <span className="absolute left-3 bottom-1 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]"></span>
            </li>
          ))}
        </ul>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Logout</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default NavbarMobile;
