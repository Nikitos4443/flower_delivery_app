type Flower = {
    id: number;
    title: string;
    imageUrl: string;
    isFavorite: boolean;
    price: number;
    shopId: number;
}

type Shop = {
    id: number;
    title: string;
}

type CardProps = Flower;