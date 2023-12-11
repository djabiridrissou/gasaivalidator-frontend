import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SupplyersRepService } from "../../../services/repositories/supplyers-rep.service";



const supplyersRepoService = SupplyersRepService.getInstance();

// Thunks
export const getAllSupplyersRepo = createAsyncThunk(
    "supplyersRepo/getAllSupplyersRepo",
    async ({page, searchTerm}) => {
        return await supplyersRepoService.getSupplyersRepo(page, searchTerm);
    }
);


const initialState = {
    supplyersRepository: [],
};

const supplyersRepoSlice = createSlice({
    name: "supplyersRepo",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllSupplyersRepo.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.supplyersRepository = payload.data;
            }
        });
    },
});

export default supplyersRepoSlice.reducer;