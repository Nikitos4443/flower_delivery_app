import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongoose";
import Shop from "@/lib/models/Shop";

export async function GET() {
    try {
        await connectMongoDB();

        const shops = await Shop.find().lean();

        return NextResponse.json({ shops }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch shops" },
            { status: 500 }
        );
    }
}
