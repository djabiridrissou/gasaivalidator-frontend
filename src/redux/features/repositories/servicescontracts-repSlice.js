import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ServicesContractsRepService } from "../../../services/repositories/servicescontracts-rep.service";



const servicescontractsRepoService = ServicesContractsRepService.getInstance();

// Thunks
export const getAllServicesContractsRepo = createAsyncThunk(
    "servicescontractsRepo/getAllServicesContractsRepo",
    async ({page, searchTerm}) => {
        return await servicescontractsRepoService.getServicesContractsRepo(page, searchTerm);
    }
);


const initialState = {
    servicescontractsRepository: [],
};

const servicescontractsRepoSlice = createSlice({
    name: "servicescontractsRepo",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllServicesContractsRepo.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.servicescontractsRepository = payload.data;
            }
        });
    },
});

export default servicescontractsRepoSlice.reducer;