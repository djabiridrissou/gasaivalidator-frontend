import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../services/auth.service";

const auth = AuthService.getInstance();

// Thunks
export const login = createAsyncThunk(
    "auth/login",
    async (userLoginDto) => {
        return await auth.login(userLoginDto);
    }
);
export const getCurentUser = createAsyncThunk(
    "auth/getCurentUser",
    async () => await auth.getConnectedUserFromLocalStorage()
);
export const setConnectedUserToLocalStorage = createAsyncThunk(
    "auth/setConnectedUserToLocalStorage",
    async (user) => await auth.setConnectedUserToLocalStorage(user)
);
export const signOut = createAsyncThunk(
    "auth/signOut",
    async () => await auth.signOut()
);

const initialState = {
    token: null,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, { payload }) => {
            if (payload.data?.user && payload.data.token) {
                state.user = payload.data.user;
                state.token = payload.data.token;
            }
        });
        builder.addCase(getCurentUser.fulfilled, (state, { payload }) => {
            if (payload?.user && payload?.token) {
                state.user = payload.user;
                state.token = payload.token;
            }
        });
        builder.addCase(signOut.fulfilled, (state) => {
            state.user = null;
        });
    }
});

// export const { } = authSlice.actions;
export default authSlice.reducer;