import {Button} from "@/components/ui/button";

function MainCard({ title, imageUrl, isFavorite }: MainCardProps) {
    return (
        <div className="border rounded-lg w-60 p-4 text-center shadow-md flex flex-col items-center">
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-36 object-cover rounded-md"
            />
            <h3 className="mt-3 mb-2 text-lg font-semibold">{title}</h3>
            <img
                src={isFavorite ? '/favourite.png' : '/notFavourite.png'}
                alt={isFavorite ? 'В улюблених' : 'Не в улюблених'}
                className="mx-auto w-6 h-6 mb-3"
            />
            <Button>
                Add to Cart
            </Button>
        </div>
    );
}

export default MainCard;
