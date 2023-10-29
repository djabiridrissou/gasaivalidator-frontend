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

export const getAllNoWarrant = createAsyncThunk(
    "gifmis/getAllNoWarrant",
    async () => await gifmis.getAllNoWarrant()
);

export const getAllNotInGifmis = createAsyncThunk(
    "gifmis/notingifmis",
    async () => await gifmis.getAllNotInGifmis()
);


export const getAllNoContract = createAsyncThunk(
    "gifmis/nocontract",
    async () => await gifmis.getAllNoContract()
);

export const getStoreManagement = createAsyncThunk(
    "gifmis/storemanagement",
    async () => await gifmis.getStoreManagement()
);

const initialState = {
    transactions: [],
    transactionsPerOrg: [],
    noWarrant: [],
    notInGifmis: [],
    noContract: [],
    storeManagement: [],
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
        builder.addCase(getAllNoWarrant.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.noWarrant = payload.data;
            }
        });
        builder.addCase(getAllNotInGifmis.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.notInGifmis = payload.data;
            }
        });
        builder.addCase(getAllNoContract.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.noContract = payload.data;
            }
        });
        builder.addCase(getStoreManagement.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.storeManagement = payload.data;
            }
        });

    },
});

// export const { } = authSlice.actions;
export default gifmisSlice.reducer;