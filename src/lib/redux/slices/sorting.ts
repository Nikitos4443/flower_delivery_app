import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SortingState {
    sorting: Sorting;
}

const initialState: SortingState = {
    sorting: null
}

export const sortingSlice = createSlice({
    name: 'sorting',
    initialState,
    reducers: {
        setSorting: (state, action: PayloadAction<Sorting>) => {
            state.sorting = action.payload
        }
    },
});

export const { setSorting } = sortingSlice.actions

export default sortingSlice.reducer