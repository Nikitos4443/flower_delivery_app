"use client"

import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
import NavItems from "@/components/NavItems";

function Navbar() {

    const pathName = usePathname();

    return (
        <nav className="navbar">
            <NavItems pathName={pathName} />

            {/*Only on shop page*/}
            {pathName === "/" && (
                <div className="flex items-center gap-4 max-sm:h-15">
                    <Button>Sort by price</Button>
                    <Button>Sort by date</Button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;