import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {
        loginSuccess: (state) => {
            state.isLoggedIn = true;
        },
    },
});

export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;
