import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IpcRepService } from "../../../services/repositories/ipc-rep.service";



const ipcRepService = IpcRepService.getInstance();

// Thunks
export const getAllIpcRepo = createAsyncThunk(
    "ipcRepo/getAllIpcRepo",
    async ({page, searchTerm}) => {
        return await ipcRepService.getIpcRepo(page, searchTerm);
    }
);


const initialState = {
    ipcRepository: [],
};

const ipcRepoSlice = createSlice({
    name: "ipcRepo",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllIpcRepo.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.ipcRepository = payload.data;
            }
        });
    },
});

export default ipcRepoSlice.reducer;