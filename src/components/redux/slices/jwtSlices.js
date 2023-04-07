import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    jwt: null,
};

const jwtSlice = createSlice({
    name: 'jwt',
    initialState,
    reducers: { //reducres are functions that take the current state and an action object, and then return a new state
        setJwt: (state, action) => {
            state.jwt = action.payload;
        },
    },
});

export const {setJwt} = jwtSlice.actions; //export the action creators

export default jwtSlice.reducer; //export the reducer function