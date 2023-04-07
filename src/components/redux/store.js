import {configureStore} from '@reduxjs/toolkit';
import jwtSliceReducer from './slices/jwtSlices';
import userInfoSliceReducer from './slices/userInfoSlice';


export const store = configureStore({
    reducer: {
        jwt: jwtSliceReducer,
        userInfo: userInfoSliceReducer
    }
});

export default store;