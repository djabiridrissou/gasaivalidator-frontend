import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WorksRepService } from "../../../services/repositories/works-rep.service";




const worksRepoService = WorksRepService.getInstance();

// Thunks
export const getAllWorksRepo = createAsyncThunk(
    "worksRepo/getAllWorksRepo",
    async ({page, searchTerm}) => {
        return await worksRepoService.getAllWorks(page, searchTerm);
    }
);


const initialState = {
    worksRepository: [],
};

const worksRepoSlice = createSlice({
    name: "worksRepo",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllWorksRepo.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.worksRepository = payload.data;
            }
        });
    },
});

export default worksRepoSlice.reducer;