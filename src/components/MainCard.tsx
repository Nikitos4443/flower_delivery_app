"use client"

import {Button} from "@/components/ui/button";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";
import {addToCart, removeFromCart} from "@/lib/redux/slices/cart";
import {useState} from "react";

function MainCard(props: CardProps) {
    const { _id, title, imageUrl, isFavorite, price } = props

    const cart = useAppSelector((state) => state.cart.chosenFlowers)
    const isInCart = cart.some(f => f._id === _id)

    const [isFavourite, setIsFavourite] = useState<boolean>(() => {
        const favouritesStr = localStorage.getItem('favourites');
        if (!favouritesStr) return false;

        try {
            const favouritesArr: string[] = JSON.parse(favouritesStr);
            return favouritesArr.includes(_id);
        } catch {
            return false;
        }
    });

    function toggleFavourites() {
        const favouritesStr = localStorage.getItem('favourites');
        let favouritesArr: string[] = favouritesStr ? JSON.parse(favouritesStr) : [];

        if (isFavourite) {
            favouritesArr = favouritesArr.filter(id => id !== _id);
            setIsFavourite(false);
        } else {
            favouritesArr.push(_id);
            setIsFavourite(true);
        }

        localStorage.setItem('favourites', JSON.stringify(favouritesArr));
    }

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
                src={isFavourite ? '/favourite.png' : '/notFavourite.png'}
                alt={isFavourite ? 'В улюблених' : 'Не в улюблених'}
                className="mx-auto w-6 h-6 mb-3 cursor-pointer"
                onClick={toggleFavourites}
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
