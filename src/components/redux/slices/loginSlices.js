import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogged: false
};


const loginSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setIsLogged: (state, action) => {
            state.isLogged = action.payload;
        }
    }
});

export const {setIsLogged} = loginSlice.actions;

export default loginSlice.reducer;