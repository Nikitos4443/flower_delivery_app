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

type Order = {
    _id: string;
    userPhone: string;
    userEmail: string;
    userAddress: string;
    userName: string;
    flowers: Flower[];
    totalPrice: number;
    createdAt: string;
}

type Sorting =  'price' | 'createdAt' | null;