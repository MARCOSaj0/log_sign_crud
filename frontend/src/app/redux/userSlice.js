import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { login_URL } from '../config/index';


const initialState = {
    user: [],
    error: "",
    success: null,
    isLoggedIn: false,
    usersDetails: {}
};

export const login = createAsyncThunk(
    "login",
    async (data, { dispatch, getState, rejectWithValue }) => {
        try {
            const userData = await axios.post(`${login_URL}`, data );
            await localStorage.setItem("user", JSON.stringify(userData.data.details));
            return userData.data.details;
        }
        catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);



export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoadingTrue: (state, action) => {
            state.loading = true;
        },
        setLoadingFalse: (state, action) => {
            state.loading = false;
        },
        setLoggin: (state) => {
            state.isLoggedIn = !state.isLoggedIn;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearError: (state, action) => {
            state.error = "";
        },
        clearUserSuccess: (state, action) => {
            state.user = "";
        },
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.error = "";
            state.user = action.payload;
            state.loading = false;
            state.isLoggedIn = true;
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload || "Network Issue Please Check Your Internt Connection";
        },
    }
});

export const {
    setLoadingFalse,
    setLoadingTrue,
    setLoggin,
    setUser,
    clearError,
    clearUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;