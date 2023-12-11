import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TransactionsRepService } from "../../../services/repositories/transactions-rep.service";



const transactionsRepoService = TransactionsRepService.getInstance();

// Thunks
export const getAllTransactionsRepo = createAsyncThunk(
    "transactionsRepo/getAllTransactionsRepo",
    async ({page, searchTerm}) => {
        return await transactionsRepoService.getTransactionsRepo(page, searchTerm);
    }
);


const initialState = {
    transactionsRepository: [],
};

const transactionsRepoSlice = createSlice({
    name: "transactionsRepo",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllTransactionsRepo.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.transactionsRepository = payload.data;
            }
        });
    },
});

export default transactionsRepoSlice.reducer;