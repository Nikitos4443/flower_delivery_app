"use client"

import {useForm} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";
import ShoppingCartCard from "@/components/ShoppingCartCard";
import {ToastContainer, toast} from "react-toastify";
import { useRouter } from "next/navigation";
import {useCallback} from "react";
import {clear} from "@/lib/redux/slices/cart";

const formSchema = z.object({
    name: z.string("Name must contain minimum 2 and maximum 50 symbols").min(2).max(50),
    email: z.email("Incorrect email"),
    phone: z.string("Incorrect phone number"),
    address: z.string()
})

function ShoppingCart() {
    const router = useRouter();

    const cart = useAppSelector((state) => state.cart.chosenFlowers);
    const dispatch = useAppDispatch();

    const totalPrice = useCallback(() => {
        return cart.reduce((acc, flower) => acc + flower.price * flower.count, 0)
    }, [cart])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

        const dto = {
            userName: values.name,
            userEmail: values.email,
            userPhone: values.phone,
            userAddress: values.address,
            flowers: cart,
            totalPrice: totalPrice()
        }

        const response = await fetch("/api/orders", {
            method: "POST",
            body: JSON.stringify(dto)
        })

        if(!response.ok) {
            toast.error("Could not create order");
        }

        dispatch(clear());

        const data = await response.json();
        console.log(data)
        router.push(`/orders/${data.order._id}`);
    }

    return (
        <main>
            <div className="flex gap-5 h-6/7 overflow-hidden">
                <section className="shopping-cart-section h-fit">
                    <Form {...form}>
                        <form id="shopping-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-15">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your name" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
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
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your phone" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your address" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </section>

                <section className="shopping-cart-section overflow-y-auto flex flex-col gap-5">
                    {cart.length > 0 ? (
                        <>
                            {cart.map((item) => (
                                <ShoppingCartCard key={item._id} {...item} />
                            ))}
                        </>
                    ): (
                        <div>
                            Nothing chosen
                        </div>
                    )}
                </section>
            </div>
            <div className="flex justify-end ">
                <div className="flex gap-5 items-center">
                    <span>Total sum: {totalPrice()}</span>
                    <Button type="submit" form="shopping-form" disabled={cart.length === 0}>
                        Submit
                    </Button>
                </div>
            </div>
            <ToastContainer />
        </main>
    );
}

export default ShoppingCart;