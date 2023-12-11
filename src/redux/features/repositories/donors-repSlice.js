import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DonorsRepService } from "../../../services/repositories/donors-rep.service";


const donorsRepoService = DonorsRepService.getInstance();

// Thunks
export const getAllDonorsRepo = createAsyncThunk(
    "donorsRepo/getAllDonorsRepo",
    async ({page, searchTerm}) => {
        return await donorsRepoService.getDonorsRepo(page, searchTerm);
    }
);


const initialState = {
    donorsRepository: [],
};

const donorsRepoSlice = createSlice({
    name: "donorsRepo",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllDonorsRepo.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.donorsRepository = payload.data;
            }
        });
    },
});

export default donorsRepoSlice.reducer;