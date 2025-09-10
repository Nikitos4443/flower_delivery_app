import Flower from "@/lib/models/Flower"
import connectMongoDB from "@/lib/mongoose";
import {NextResponse} from "next/server";
import Shop from "@/lib/models/Shop";

export async function POST() {
    try {
        await connectMongoDB();

        const shops = await Shop.find().lean();
        if (!shops.length) {
            return NextResponse.json({error: "No shops found. Create shops first."}, {status: 400});
        }

        const flowersToInsert = Array.from({length: 100}).map((_, i) => {
            const randomImageNumber = Math.floor(Math.random() * 10) + 1;
            return {
                title: `Flower ${i + 1}`,
                imageUrl: `/flowers/flower${randomImageNumber}.png`,
                price: Math.floor(Math.random() * 500) + 50,
                shop: shops[Math.floor(Math.random() * shops.length)]._id,
            };
        });

        const createdFlowers = await Flower.insertMany(flowersToInsert);

        return NextResponse.json(
            {message: "100 flowers added", flowers: createdFlowers},
            {status: 200}
        );
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({error: "Failed to add flowers"}, {status: 500});
    }
}

export async function GET(request: Request) {
    try {
        await connectMongoDB();

        let limit = 9;
        let page = 0;
        let sortBy: Sorting = null;
        let filter: Record<string, any> = {};

        const searchParams = new URL(request.url).searchParams;

        const limitParam = searchParams.get("limit");
        if (limitParam) limit = parseInt(limitParam);

        const pageParam = searchParams.get("page");
        if (pageParam) page = parseInt(pageParam)-1;

        const sortByParam = searchParams.get("sortBy");
        if (sortByParam) sortBy = sortByParam as Sorting;

        const shopIdParam = searchParams.get("shopId");
        if (shopIdParam) filter = { shop: shopIdParam };

        const favouritesParam = searchParams.get("favourites");
        const favourites: string[] = favouritesParam ? JSON.parse(favouritesParam) : [];

        const flowers = await Flower.find(filter).lean();

        const compareFn = (a: any, b: any) => {
            if (!sortBy) return 0;
            if (a[sortBy] === b[sortBy]) return 0;
            return a[sortBy] > b[sortBy] ? 1 : -1
        };

        const favouritesFlowers = flowers
            .filter(f => favourites.includes(f._id.toString()))
            .sort(compareFn);

        const otherFlowers = flowers
            .filter(f => !favourites.includes(f._id.toString()))
            .sort(compareFn);


        const sortedFlowers = [...favouritesFlowers, ...otherFlowers];

        const paginatedFlowers = sortedFlowers.slice(page * limit, (page + 1) * limit);

        const totalCount = flowers.length;
        const totalPages = Math.ceil(totalCount / limit);

        return NextResponse.json({
            flowers: paginatedFlowers,
            totalCount,
            totalPages,
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch flowers" },
            { status: 500 }
        );
    }
}


