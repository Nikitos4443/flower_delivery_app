"use client"

import {Button} from "@/components/ui/button";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";
import {addToCart, removeFromCart} from "@/lib/redux/slices/cart";

function MainCard(props: CardProps) {
    const { id, title, imageUrl, isFavorite, price } = props

    const cart = useAppSelector((state) => state.cart.chosenFlowers)
    const isInCart = cart.some(f => f.id === id)

    const dispatch = useAppDispatch();

    return (
        <div className="border max-h-fit rounded-lg w-60 p-4 text-center shadow-md flex flex-col items-center">
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-36 object-cover rounded-md"
            />
            <h3 className="mt-3 mb-2 text-lg font-semibold">{title}</h3>
            <img
                src={isFavorite ? '/favourite.png' : '/notFavourite.png'}
                alt={isFavorite ? 'В улюблених' : 'Не в улюблених'}
                className="mx-auto w-6 h-6 mb-3 cursor-pointer"
            />

            <p className="text-gray-700 font-medium mb-3">{price} ₴</p>

            {isInCart ? (
                <Button onClick={() => dispatch(removeFromCart(props))}>
                    Remove from Cart
                </Button>
            ) : (
                <Button onClick={() => dispatch(addToCart(props))}>
                    Add to Cart
                </Button>
            )}
        </div>

    );
}

export default MainCard;
