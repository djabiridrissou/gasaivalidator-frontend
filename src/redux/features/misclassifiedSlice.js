import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MisclassifiedService } from "../../services/misclassified.service";

const misclassified = MisclassifiedService.getInstance();

// Thunks
export const getAllMisclassified = createAsyncThunk(
    "misclassified/getAll",
    async (page) => {
        return await misclassified.getAllMisclassified(page);
    }
);


const initialState = {
    misclassifiedList: [],
};

const misclassifiedSlice = createSlice({
    name: "misclassified",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllMisclassified.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.misclassifiedList = payload.data;
            }
        });
    },
});

// export const { } = authSlice.actions;
export default misclassifiedSlice.reducer;