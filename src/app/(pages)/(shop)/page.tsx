"use client"

import { ToastContainer, toast } from 'react-toastify';
import MainCard from "@/components/MainCard";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/lib/redux/hooks";
import { Button } from '@/components/ui/button';

export default function Shop() {
    const [chosenShop, setChosenShop] = useState<string | null>(null);
    const [flowers, setFlowers] = useState<Array<Flower>>([]);
    const [shops, setShops] = useState<Array<Shop>>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const sorting = useAppSelector(state => state.sorting.sorting);
    const limit = 9;

    async function chooseStore(id: string) {
        setPage(1);
        setChosenShop(id);
    }

    useEffect(() => {
        async function getShops() {
            setIsLoading(true);
            const responseShops = await fetch("/api/shops");

            if (!responseShops.ok) {
                toast.error("Could not get shops");
                setIsLoading(false);
                return;
            }

            const dataShops: { shops: Array<Shop> } = await responseShops.json();
            setShops(dataShops.shops);

            if (dataShops.shops.length > 0) {
                const firstShopId = dataShops.shops[0]._id;
                setChosenShop(firstShopId);
            }
            setIsLoading(false);
        }

        getShops();
    }, []);

    useEffect(() => {
        if (!chosenShop) return;

        async function getFlowers() {
            setIsLoading(true);
            const favourites = localStorage.getItem("favourites");
            const queryParams: Record<string, string> = {
                page: page.toString(),
                limit: limit.toString(),
                ...(sorting ? { sortBy: sorting } : {}),
                ...(favourites ? { favourites } : {}),
            };

            if (chosenShop) {
                queryParams.shopId = chosenShop;
            }

            const query = new URLSearchParams(queryParams);

            const response = await fetch(`/api/flowers?${query.toString()}`);

            if (!response.ok) {
                toast.error("Could not get flowers");
                setIsLoading(false);
                return;
            }

            const data: { flowers: Array<Flower>, totalPages: number } = await response.json();
            setFlowers(data.flowers);
            setTotalPages(data.totalPages);
            setIsLoading(false);
        }

        getFlowers();
    }, [chosenShop, page, sorting]);

    if (isLoading) {
        return (
            <main className="flex items-center">
                Loading...
            </main>
        );
    }

    const handlePrev = () => setPage(prev => Math.max(prev - 1, 1));
    const handleNext = () => setPage(prev => Math.min(prev + 1, totalPages));

    return (
        <main className="max-sm:overflow-y-auto items-center gap-0 w-[100%]">
            <div className="flex h-[90%] max-sm:flex-col max-sm:items-center max-sm:gap-10">
                <section
                    className="w-1/3 flex flex-col items-center justify-start gap-5 border-r border-gray-200 h-full max-sm:w-full sm:overflow-y-auto">
                    <h2 className="text-lg font-semibold">Shops:</h2>
                    {shops.map(shop => (
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
                        return (
                            <MainCard key={card._id} {...card} />
                        )
                    })}
                </section>
            </div>
            <div className="h-[10%] flex gap-5 items-center">
                <Button disabled={page===1} onClick={handlePrev}>
                    {"<-"}
                </Button>
                <span>
                    {page}/{totalPages}
                </span>
                <Button disabled={page === totalPages} onClick={handleNext}>
                    {"->"}
                </Button>
            </div>
            <ToastContainer />
        </main>
    );
}
