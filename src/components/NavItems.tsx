'use client'

import Link from "next/link";
import {cn} from "@/lib/utils";

const navItems = [
    { label: "Shop", href: "/", },
    { label: "Shopping Cart", href: "/shopping-cart", },
    { label: "Orders History", href: "/orders", }
]

function NavItems({pathName}: {pathName: string}) {
    return (
        <nav className="flex items-center gap-4">
            {navItems.map(({label, href}) => (
                <Link href={href} key={label} className={cn("transition-all", pathName === href && 'text-primary font-semibold')}>
                    {label}
                </Link>
            ))}
        </nav>
);
}

export default NavItems;