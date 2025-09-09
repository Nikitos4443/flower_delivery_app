import {Button} from "@/components/ui/button"
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";
import {decrementCount, incrementCount} from "@/lib/redux/slices/cart";

function ShoppingCartCard(props: CardProps & {count: number}) {

    const dispatch = useAppDispatch();

    return (
        <div className="flex items-center justify-between gap-4 border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
                <img
                    src={props.imageUrl}
                    alt={props.title}
                    className="w-20 h-20 object-cover rounded-md"
                />

                <div className="flex-1">
                    <h3 className="text-lg font-semibold">{props.title}</h3>
                    <p className="text-gray-600">{props.price*props.count} ₴</p>
                </div>
            </div>
            <div>
                Count: {props.count}
            </div>
            <div className="flex flex-col items-center gap-4">
                <Button onClick={() => {dispatch(incrementCount(props.id))}}>
                    Increment
                </Button>
                <Button onClick={() => {dispatch(decrementCount(props.id))}}>
                    Decrement
                </Button>
            </div>
        </div>
    )
}

export default ShoppingCartCard
