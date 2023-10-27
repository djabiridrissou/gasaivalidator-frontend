import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GoodsService } from "../../services/gifmis-service";

const gifmis = GoodsService.getInstance();

// Thunks
export const getAllGifmis = createAsyncThunk(
    "gifmis/getAllGifmis",
    async () => {
        return await gifmis.getAllTransactions();
    }
);
export const countPerOrganisation = createAsyncThunk(
    "gifmis/countPerOrganisation",
    async () => await gifmis.countPerOrg()
);


const initialState = {
    transactions: [],
    transactionsPerOrg: [],
};

const gifmisSlice = createSlice({
    name: "gifmis",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllGifmis.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.transactions = payload.data;
            }
        });
        builder.addCase(countPerOrganisation.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.transactionsPerOrg = payload.data;
            }
        });
    },
});

// export const { } = authSlice.actions;
export default gifmisSlice.reducer;