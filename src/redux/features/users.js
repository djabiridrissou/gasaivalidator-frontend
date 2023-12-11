import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../../services/users.service";

const users = UserService.getInstance();

// Thunks
export const addUser = createAsyncThunk(
    "users/addUser",
    async (addUserDto) => {
        return await users.addUser(addUserDto);
    }
);
export const getUsers = createAsyncThunk(
    "users/getUsers",
    async () => await users.getUsers()
);

export const updateUserInformation = createAsyncThunk(
    "users/updateUser",
    async ({id, data}) => await users.updateUser(id, data)
);

const initialState = {
    users: [],
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.users = payload.data;
            }
        });
        builder.addCase(addUser.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.users.push(payload.data);
            }
        });
        builder.addCase(updateUserInformation.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.users.push(payload.data);
            }
        })
    }
});

// export const { } = authSlice.actions;
export default usersSlice.reducer;