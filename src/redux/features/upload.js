import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UploadService } from "../../services/upload.service";

const upload = UploadService.getInstance();

// Thunks
export const uploadGifmis = createAsyncThunk(
    "upload/uploadGifmis",
    async (uploadDto) => {
        return await upload.uploadGifmis(uploadDto);
    }
);

const initialState = {
};

const uploadSlice = createSlice({
    name: "upload",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
    }
});

// export const { } = uploadSlice.actions;
export default uploadSlice.reducer;