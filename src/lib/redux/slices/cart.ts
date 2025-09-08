import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CartState {
    chosenFlowers: Flower[];
}

const initialState: CartState = {
    chosenFlowers: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Flower>) => {
            state.chosenFlowers.push(action.payload)
            localStorage.setItem('cart', JSON.stringify(state.chosenFlowers))
            console.log(state.chosenFlowers)
        },
        removeFromCart: (state, action: PayloadAction<Flower>) => {
            const index = state.chosenFlowers.findIndex(f => f.id === action.payload.id)
            if (index >= 0) {
                state.chosenFlowers.splice(index, 1)
            }
            localStorage.setItem('cart', JSON.stringify(state.chosenFlowers))
        }
    },
})

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer