import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/lib/redux/slices/cart'
import sortingReducer from '@/lib/redux/slices/sorting'

export const makeStore = () => {
    return configureStore({
        reducer: {
            cart: cartReducer,
            sorting: sortingReducer,
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']