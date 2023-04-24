import {configureStore} from '@reduxjs/toolkit';
import jwtSliceReducer from './slices/jwtSlices';
import userInfoSliceReducer from './slices/userInfoSlice';
import productsSliceReducer from './slices/productsSlice';
import loginSlicesReducer from './slices/loginSlices';

export const store = configureStore({
    reducer: {
        jwt: jwtSliceReducer,
        userInfo: userInfoSliceReducer,
        products: productsSliceReducer,
        login: loginSlicesReducer
    }
});

export default store;