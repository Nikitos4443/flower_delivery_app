import {shops} from "@/constants/shops"
import {cards} from "@/constants/cards";
import MainCard from "@/components/MainCard";

export default function Shop() {
    return (
        <main className="max-sm:overflow-y-auto">
            <div className="flex h-[100%] max-sm:flex-col max-sm:items-center max-sm:gap-10">
                <section className="w-1/3 flex flex-col items-center justify-start gap-5 border-r border-gray-200 h-full max-sm:w-full sm:overflow-y-auto">
                    <h2 className="text-lg font-semibold">Shops:</h2>
                    {shops.map(({id, name}) => {
                        return (
                            <div key={id} className="border-1 border-black p-5 w-50 text-center rounded-lg text-lg hover:bg-gray-300 transition-all cursor-pointer">
                                {name}
                            </div>
                        )
                    })}
                </section>
                <section className="w-2/3 sm:overflow-y-auto flex flex-wrap gap-10 justify-center max-sm:h-100">
                    {cards.map((card) => {
                        return (
                            <MainCard key={card.id} {...card} />
                        )
                    })}
                </section>
            </div>
        </main>
    );
}
