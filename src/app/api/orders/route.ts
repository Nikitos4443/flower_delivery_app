import Order from "@/lib/models/Order"
import connectMongoDB from "@/lib/mongoose";
import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest, res: NextResponse) {
    try {
        const data = await request.json();
        await connectMongoDB();

        const order = await Order.create(data);

        return NextResponse.json({ order }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to get flowers" }, { status: 500 });
    }
}

