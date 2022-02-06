
import { createSlice } from '@reduxjs/toolkit'

export const loaderSlice = createSlice({
    name: 'global_loader',
    initialState: {
        isLoading: false,
    },
    reducers: {
        update: (state, action) => {

            state.isLoading = action.payload;
        }
    },
})

export const { update } = loaderSlice.actions

export default loaderSlice.reducer