import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GoodsContractsRepService } from "../../../services/repositories/goodscontracts-rep.service";


const goodscontractsRepoService = GoodsContractsRepService.getInstance();

// Thunks
export const getAllGoodscontractsRepo = createAsyncThunk(
    "goodscontractsRepo/getAllGoodscontractsRepo",
    async ({page, searchTerm}) => {
        return await goodscontractsRepoService.getGoodsContractsRepo(page, searchTerm);
    }
);


const initialState = {
    goodscontractsRepository: [],
};

const goodscontractsRepoSlice = createSlice({
    name: "goodscontractsRepo",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllGoodscontractsRepo.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.goodscontractsRepository = payload.data;
            }
        });
    },
});

export default goodscontractsRepoSlice.reducer;