import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BtaRepService } from "../../../services/repositories/bta-rep.service";

const btaRepoService = BtaRepService.getInstance();

// Thunks
export const getAllBtaRepo = createAsyncThunk(
    "btaRepo/getAllBtaRepo",
    async ({page, searchTerm}) => {
        console.log("pagge search dans slice", page, searchTerm);
        return await btaRepoService.getBtaRepo(page, searchTerm);
    }
);


const initialState = {
    btaRepository: [],
};

const btaRepoSlice = createSlice({
    name: "btaRepo",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllBtaRepo.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.btaRepository = payload.data;
            }
        });
    },
});

export default btaRepoSlice.reducer;