
import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'global_user',
    initialState: {
        uNumber: "",
        uAcessToken: ""
    },
    reducers: {
        update: (state, action) => {

            // state.uNumber = action.payload.uNumber;

            // state.uAcessToken = action.payload.uAcessToken;

            return { ...state, ...action.payload }
        }

    },
})

export const { update } = userSlice.actions

export default userSlice.reducer