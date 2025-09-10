"use client"

import React, {useState} from 'react';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import validator from "validator";
import {Button} from "@/components/ui/button";
import {toast} from "react-toastify";

const formSchema = z.object({
    email: z.email("Incorrect email"),
    phone: z.string().refine((val) => validator.isMobilePhone(val, "any"), {
        message: "Incorrect phone number",
    }),
})

function OrderHistory() {

    const [orders, setOrders] = useState<Order[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            phone: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const searchParams = new URLSearchParams();

        searchParams.append("email", values.email);
        searchParams.append("phone", values.phone);

        const response = await fetch(`/api/orders?${searchParams.toString()}`);

        if (!response.ok) {
            toast.error("Could not get orders");
            return;
        }

        const data: { orders: Order[] } = await response.json();
        setOrders(data.orders);
    }

    return (
        <main className="overflow-y-auto p-20 max-sm:p-4">
            <section className="w-[100%] flex flex-col items-center">
                <Form {...form}>
                    <form id="orders-history-form" onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-10 w-[30%] max-sm:w-[100%] flex flex-col items-center">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem className="w-[100%]">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({field}) => (
                                <FormItem className="w-[100%]">
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your phone" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-fit">Get order history</Button>
                    </form>
                </Form>
            </section>
            <section className="grid grid-cols-2 w-[100%] gap-5 max-lg:grid-cols-1">
                {orders.length > 0 && (
                    orders.map(order => {
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
                            <div
                                key={order._id}
                                className="border h-fit border-gray-200 rounded-2xl p-6 shadow-lg bg-white hover:shadow-xl transition-all max-lg:w-[100%]"
                            >
                                <div className="flex justify-between items-center mb-4 max-lg:flex max-lg:flex-col">
                                    <h3 className="text-xl font-semibold">Order #{order._id}</h3>
                                    <span className="text-sm text-gray-500">{formattedDate}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-4 max-lg:flex max-lg:flex-col max-lg:items-center">
                                    <p><span className="font-medium">Name:</span> {order.userName}</p>
                                    <p><span className="font-medium">Phone:</span> {order.userPhone}</p>
                                    <p><span className="font-medium">Email:</span> {order.userEmail}</p>
                                    <p><span className="font-medium">Address:</span> {order.userAddress}</p>
                                </div>

                                <div className="border-t pt-4">
                                    <h4 className="font-medium mb-2">Flowers:</h4>
                                    <ul className="flex flex-col gap-3">
                                        {order.flowers.map(flower => (
                                            <li
                                                key={flower._id}
                                                className="flex items-center gap-4 border rounded-lg p-3 hover:bg-gray-50"
                                            >
                                                <img
                                                    src={flower.imageUrl}
                                                    alt={flower.title}
                                                    className="w-16 h-16 object-contain rounded-lg border"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{flower.title}</span>
                                                    <span className="text-sm text-gray-600">
                                                      ${flower.price}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-4 flex justify-end">
                                    <span className="text-lg font-semibold">
                                      Total: ${order.totalPrice}
                                    </span>
                                </div>
                            </div>
                        )
                    })
                )}
            </section>
        </main>
    );
}

export default OrderHistory;