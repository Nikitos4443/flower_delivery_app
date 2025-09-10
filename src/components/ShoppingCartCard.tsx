import {Button} from "@/components/ui/button"
import {useAppDispatch} from "@/lib/redux/hooks";
import {decrementCount, incrementCount} from "@/lib/redux/slices/cart";

function ShoppingCartCard({flower, count}: {flower: Flower, count: number}) {

    const dispatch = useAppDispatch();

    return (
        <div className="flex items-center justify-between gap-4 border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 max-sm:flex-col">
                <img
                    src={flower.imageUrl}
                    alt={flower.title}
                    className="w-20 h-20 object-contain rounded-md"
                />

                <div className="flex-1">
                    <h3 className="text-lg font-semibold">{flower.title}</h3>
                    <p className="text-gray-600">{flower.price*count} ₴</p>
                </div>
            </div>
            <div>
                Count: {count}
            </div>
            <div className="flex flex-col items-center gap-4">
                <Button onClick={() => {dispatch(incrementCount(flower._id))}}>
                    Increment
                </Button>
                <Button onClick={() => {dispatch(decrementCount(flower._id))}}>
                    Decrement
                </Button>
            </div>
        </div>
    )
}

export default ShoppingCartCard
