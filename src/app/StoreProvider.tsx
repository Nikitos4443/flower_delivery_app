'use client'
import {useEffect, useRef} from 'react'
import {Provider} from 'react-redux'
import {makeStore, AppStore} from '@/lib/redux/store'
import {addToCart} from "@/lib/redux/slices/cart";

export default function StoreProvider({
      children,
  }: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>(undefined)
    if (!storeRef.current) {
        storeRef.current = makeStore()
    }

    useEffect(() => {
        const stored = localStorage.getItem('cart')
        if (stored) {
            const flowers = JSON.parse(stored)
            flowers.forEach((flower: any) => storeRef.current?.dispatch(addToCart(flower)))
        }
    }, [])

    return <Provider store={storeRef.current}>{children}</Provider>
}