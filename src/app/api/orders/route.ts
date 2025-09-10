import Order from "@/lib/models/Order"
import connectMongoDB from "@/lib/mongoose";
import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        await connectMongoDB();

        const order = await Order.create(data);

        return NextResponse.json({ order }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to get flowers" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = new URL(request.url).searchParams;

        const email = searchParams.get("email");
        const phone = searchParams.get("phone");

        if(!email || ! phone) {
            return NextResponse.json({ error: "Failed to get orders" }, { status: 500 });
        }

        await connectMongoDB();

        function escapeRegex(text: string) {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        }

        const orders = await Order.find({
            userEmail: email,
            userPhone: { $regex: escapeRegex(phone), $options: "i" }
        });

        return NextResponse.json({ orders }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to get flowers" }, { status: 500 });
    }
}

