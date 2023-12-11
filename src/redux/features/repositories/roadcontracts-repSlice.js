import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RoadContractsRepService } from "../../../services/repositories/roadcontracts-rep.service";



const roadContractsRepoService = RoadContractsRepService.getInstance();

// Thunks
export const getAllRoadContractsRepo = createAsyncThunk(
    "roadContractsRepo/getAllRoadContractsRepo",
    async ({page, searchTerm}) => {
        return await roadContractsRepoService.getRoadContractsRepo(page, searchTerm);
    }
);


const initialState = {
    roadContractsRepository: [],
};

const roadscontractsRepoSlice = createSlice({
    name: "roadscontractsRepo",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllRoadContractsRepo.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.roadContractsRepository = payload.data;
            }
        });
    },
});

export default roadscontractsRepoSlice.reducer;