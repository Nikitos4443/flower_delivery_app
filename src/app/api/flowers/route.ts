import Flower from "@/lib/models/Flower"
import connectMongoDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
 
export async function GET() {
    try {
        await connectMongoDB();

        const flowers = await Flower.find().populate({ path: "shop", select: "name" }).lean();

        return NextResponse.json({ flowers }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to get flowers" }, { status: 500 });
    }
}

