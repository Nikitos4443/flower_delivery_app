import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type FlowerStateType = {
    flower: Flower,
    count: number
}

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
            state.chosenFlowers.push({flower: action.payload, count: 1})
            localStorage.setItem('cart', JSON.stringify(state.chosenFlowers))
        },
        removeFromCart: (state, action: PayloadAction<Flower>) => {
            const index = state.chosenFlowers.findIndex(f => f.flower._id === action.payload._id)
            if (index >= 0) {
                state.chosenFlowers.splice(index, 1)
            }
            localStorage.setItem('cart', JSON.stringify(state.chosenFlowers))
        },
        incrementCount: (state, action: PayloadAction<string>) => {
            const flower = state.chosenFlowers.find(f => f.flower._id === action.payload)
            if (flower) {
                flower.count += 1
            }
            localStorage.setItem('cart', JSON.stringify(state.chosenFlowers))
        },
        decrementCount: (state, action: PayloadAction<string>) => {
            const flowerState = state.chosenFlowers.find(f => f.flower._id === action.payload)
            if (flowerState) {
                flowerState.count -= 1

                if(flowerState.count === 0){
                    state.chosenFlowers = state.chosenFlowers.filter(f => f.flower._id !== flowerState.flower._id)
                }
            }

            localStorage.setItem('cart', JSON.stringify(state.chosenFlowers))
        },
        clear: (state) => {
            state.chosenFlowers = []
            localStorage.setItem('cart', JSON.stringify(state.chosenFlowers))
        }
    },
})

export const { addToCart, removeFromCart, incrementCount, decrementCount, clear } = cartSlice.actions

export default cartSlice.reducer