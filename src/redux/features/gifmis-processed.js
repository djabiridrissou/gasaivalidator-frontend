import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GifmisProcessedService } from "../../services/gifmis-processed-service";

const gifmisProcessed = GifmisProcessedService.getInstance();

// Thunks
export const getAllGifmisProcessed = createAsyncThunk(
    "gifmis-processed/getAllGifmisProcessed",
    async () => {
        return await gifmisProcessed.getAllGifmisProcessed();
    }
);
export const addGifmisProcessed = createAsyncThunk(
    "gifmis-processed/addGifmisProcessed",
    async (addGifmisProcessedDto) => await gifmisProcessed.addGifmisProcessed(addGifmisProcessedDto)
);
export const updateGifmisProcessed = createAsyncThunk(
    "gifmis-processed/updateGifmisProcessed",
    async ({ updateGifmisProcessedDto, id }) => await gifmisProcessed.updateGifmisProcessed(updateGifmisProcessedDto, id)
);

const initialState = {
    gifmisProcessed: [],
};

const gifmisProcessedSlice = createSlice({
    name: "gifmis-processed",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllGifmisProcessed.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.gifmisProcessed = payload.data;
            }
        });
        builder.addCase(addGifmisProcessed.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.gifmisProcessed.push(payload.data);
            }
        });
        builder.addCase(updateGifmisProcessed.fulfilled, (state, { payload }) => {
            /* if (payload.data) {
                state.gifmisProcessed.push(payload.data);
            } */
        });
    },
});

// export const { } = authSlice.actions;
export default gifmisProcessedSlice.reducer;