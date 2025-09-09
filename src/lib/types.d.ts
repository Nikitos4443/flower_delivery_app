type Flower = {
    _id: string;
    title: string;
    imageUrl: string;
    isFavorite: boolean;
    price: number;
    shop: string;
}

type Shop = {
    _id: string;
    name: string;
}

type CardProps = Flower;