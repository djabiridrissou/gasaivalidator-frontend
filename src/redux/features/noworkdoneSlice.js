import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NoWorkDoneService } from "../../services/noworkdone.service";

const noWorkDone = NoWorkDoneService.getInstance();

// Thunks
export const getAllNoWorkDone = createAsyncThunk(
    "noworkdone/getAll",
    async () => {
        return await noWorkDone.getAll();
    }
);

const initialState = {
    noWorkDoneList: [],
};

const noWorkDoneSlice = createSlice({
    name: "noworkdone",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllNoWorkDone.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.noWorkDoneList = payload.data;
            }
        });
    },
});

// export const { } = authSlice.actions;
export default noWorkDoneSlice.reducer;