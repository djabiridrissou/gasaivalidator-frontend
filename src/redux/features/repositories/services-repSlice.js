import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ServicesRepService } from "../../../services/repositories/services-rep.service";


const servicesRepoService = ServicesRepService.getInstance();

// Thunks
export const getAllServicesRepo = createAsyncThunk(
    "servicesRepo/getAllServicesRepo",
    async ({page, searchTerm}) => {
        return await servicesRepoService.getServicesRepo(page, searchTerm);
    }
);


const initialState = {
    servicesRepository: [],
};

const servicesRepoSlice = createSlice({
    name: "servicesRepo",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllServicesRepo.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.servicesRepository = payload.data;
            }
        });
    },
});

export default servicesRepoSlice.reducer;