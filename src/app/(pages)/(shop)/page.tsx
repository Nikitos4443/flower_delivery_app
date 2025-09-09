"use client"

import { ToastContainer, toast } from 'react-toastify';
import MainCard from "@/components/MainCard";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils";

export default function Shop() {

    const [chosenShop, setChosenShop] = useState<string | null>(null);
    const [flowers, setFlowers] = useState<Array<Flower & {shop: Shop}>>([]);

    const uniqueShops = Array.from(
        new Map(flowers.map(f => [f.shop._id.toString(), f.shop])).values()
    );

    function chooseStore(id: string) {
        if(!chosenShop || (chosenShop && chosenShop !== id)) {
            setChosenShop(id);
            return;
        }

        setChosenShop(null);
    }

    useEffect(() => {
        async function getFlowers() {
            const response = await fetch("/api/flowers");

            if(!response.ok) {
                toast.error("Could not get flowers");
            }

            const data: {flowers: Array<Flower & {shop: Shop}>} = await response.json();
            console.log(data)
            setFlowers(data.flowers);
        }

        getFlowers();
    }, [])

    return (
        <main className="max-sm:overflow-y-auto">
            <div className="flex h-[100%] max-sm:flex-col max-sm:items-center max-sm:gap-10">
                <section className="w-1/3 flex flex-col items-center justify-start gap-5 border-r border-gray-200 h-full max-sm:w-full sm:overflow-y-auto">
                    <h2 className="text-lg font-semibold">Shops:</h2>
                    {uniqueShops.map(shop => (
                        <div
                            onClick={() => chooseStore(`${shop._id}`)}
                            key={shop._id}
                            className={cn(
                                "border-1 border-black p-5 w-50 text-center rounded-lg text-lg hover:bg-gray-300 transition-all cursor-pointer",
                                chosenShop === `${shop._id}` && "bg-gray-300"
                            )}
                        >
                            {shop.name}
                        </div>
                    ))}
                </section>
                <section className="w-2/3 sm:overflow-y-auto flex flex-wrap gap-10 justify-center max-sm:h-100">
                    {flowers.map((card) => {
                        if(!chosenShop || chosenShop === card.shop._id) {
                            return (
                                <MainCard key={card._id} {...card} />
                            )
                        }
                    })}
                </section>
            </div>
            <ToastContainer />
        </main>
    );
}
