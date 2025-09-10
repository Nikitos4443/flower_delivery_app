import connectMongoDB from "@/lib/mongoose";
import Order from "@/lib/models/Order";
import Shop from "@/lib/models/Shop";

interface OrderPageProps {
    params: Promise<{ id: string }>;
}

export default async function OrderDetails({ params }: OrderPageProps) {
    await connectMongoDB();

    const resolvedParams = await params;

    const order = await Order.findById(resolvedParams.id)
        .lean() as any;

    if (!order) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 text-lg">Order not found</p>
            </div>
        );
    }

    const formattedDate = new Intl.DateTimeFormat(navigator.language, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).format(new Date(order.createdAt));

    return (
        <main className="max-w-4xl mx-auto py-10 px-6">
            <div className="bg-white shadow-lg rounded-xl p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Order ID: <span className="text-indigo-600">{order._id.toString()}</span>
                </h1>

                <h2 className="text-xl font-semibold mb-4">Flowers</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {order.flowers.map(({flower, count}: any) => (
                        <li
                            key={flower._id}
                            className="border rounded-lg p-4 flex gap-4 items-center shadow-sm hover:shadow-md transition"
                        >
                            <img
                                src={`${flower.imageUrl}`}
                                alt={flower.title}
                                className="w-20 h-20 object-contain "
                            />
                            <div className="flex-1">
                                <p className="font-medium text-gray-800">{flower.title}</p>
                                <p className="text-sm text-gray-500">Shop: {flower.shop?.name || "N/A"}</p>
                                <p className="text-sm text-gray-700 mt-1">
                                    {flower.price} ₴ × {count}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-4">
                    <span className="font-semibold text-gray-700 text-lg">Total:</span>
                    <span className="text-lg font-bold text-indigo-600">{order.totalPrice} ₴</span>
                </div>

                <div className="mb-4">
                    <h3 className="font-semibold text-gray-700 mb-1">Delivery Address:</h3>
                    <p className="text-gray-800">{order.userAddress}</p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-700 mb-1">Ordered At:</h3>
                    <p className="text-gray-800">{formattedDate}</p>
                </div>
            </div>
        </main>
    );
}
