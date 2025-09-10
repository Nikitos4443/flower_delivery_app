"use client"

import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
import NavItems from "@/components/NavItems";
import {useAppDispatch} from "@/lib/redux/hooks";
import {setSorting} from "@/lib/redux/slices/sorting";

function Navbar() {

    const dispatch = useAppDispatch();
    const pathName = usePathname();

    return (
        <nav className="navbar">
            <NavItems pathName={pathName} />

            {/*Only on shop page*/}
            {pathName === "/" && (
                <div className="flex items-center gap-4 max-sm:h-15">
                    <Button onClick={() => dispatch(setSorting('price'))}>Sort by price</Button>
                    <Button onClick={() => dispatch(setSorting('createdAt'))}>Sort by date</Button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;