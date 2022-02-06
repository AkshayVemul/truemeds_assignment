import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from '../feature/loaderSlice';
import userReducer from '../feature/userSlice';



export default configureStore({
    reducer: {
        global_loader: loaderReducer,
        global_user: userReducer,
    },
})

