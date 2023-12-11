import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WorksContractsRepService } from "../../../services/repositories/workscontracts-rep.service";



const workscontractsRepoService = WorksContractsRepService.getInstance();

// Thunks
export const getAllworkscontractsRepo = createAsyncThunk(
    "workscontractsRepo/getAllworkscontractsRepo",
    async ({page, searchTerm}) => {
        return await workscontractsRepoService.getWorksContractsRepo(page, searchTerm);
    }
);


const initialState = {
    workscontractsRepository: [],
};

const workscontractsRepoSlice = createSlice({
    name: "workscontractsRepo",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllworkscontractsRepo.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.workscontractsRepository = payload.data;
            }
        });
    },
});

export default workscontractsRepoSlice.reducer;