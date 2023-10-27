import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GifmisprocessedService } from "../../services/gifmisprocessed-service";

const gifmisprocessed = GifmisprocessedService.getInstance();

// Thunks
export const getAllGifmisprocessed = createAsyncThunk(
    "gifmisprocessed/getAllGifmisprocessed",
    async () => {
        return await gifmisprocessed.getAllGifmisprocessed();
    }
);
export const addGifmisprocessed = createAsyncThunk(
    "gifmisprocessed/addGifmisprocessed",
    async () => await gifmisprocessed.addGifmisprocessed()
);


const initialState = {
    gifmisprocessed: [],
};

const gifmisprocessedSlice = createSlice({
    name: "gifmisprocessed",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllGifmisprocessed.fulfilled, (state, { payload }) => {
            if (payload.data) {
                   state.gifmisprocessed = payload.data;
            }
        });
    },
});

// export const { } = authSlice.actions;
export default gifmisprocessedSlice.reducer;