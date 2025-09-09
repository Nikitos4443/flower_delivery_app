import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type FlowerStateType = Flower & {count: number}

export interface CartState {
    chosenFlowers: FlowerStateType[];
}

const initialState: CartState = {
    chosenFlowers: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Flower>) => {
            state.chosenFlowers.push({...action.payload, count: 1})
            localStorage.setItem('cart', JSON.stringify(state.chosenFlowers))
            console.log(state.chosenFlowers)
        },
        removeFromCart: (state, action: PayloadAction<Flower>) => {
            const index = state.chosenFlowers.findIndex(f => f.id === action.payload.id)
            if (index >= 0) {
                state.chosenFlowers.splice(index, 1)
            }
            localStorage.setItem('cart', JSON.stringify(state.chosenFlowers))
        },
        incrementCount: (state, action: PayloadAction<number>) => {
            const flower = state.chosenFlowers.find(f => f.id === action.payload)
            if (flower) {
                flower.count += 1
            }
            localStorage.setItem('cart', JSON.stringify(state.chosenFlowers))
        },
        decrementCount: (state, action: PayloadAction<number>) => {
            const flower = state.chosenFlowers.find(f => f.id === action.payload)
            if (flower) {
                flower.count -= 1

                if(flower.count === 0){
                    state.chosenFlowers = state.chosenFlowers.filter(f => f.id !== flower.id)
                }
            }

            localStorage.setItem('cart', JSON.stringify(state.chosenFlowers))
        }
    },
})

export const { addToCart, removeFromCart, incrementCount, decrementCount } = cartSlice.actions

export default cartSlice.reducer