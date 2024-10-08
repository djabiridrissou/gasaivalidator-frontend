// formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isItemDistributed: false,
  fileLabelNumber: "",
  quantityDistributed: "",
};

const form7Slice = createSlice({
  name: "form7",
  initialState,
  reducers: {
    toggleIsItemDistributed: (state) => {
      state.isItemDistributed = !state.isItemDistributed;
    },

    setFileLabelNumberDistributed: (state, action) => {
      state.fileLabelNumber = action.payload;
    },

    setQuantityDistributed: (state, action) => {
      state.quantityDistributed = action.payload;
    },

    setIsItemDistributed: (state, action) => {
      state.isItemDistributed = action.payload;
    },
  },
});

export const { toggleIsItemDistributed, setFileLabelNumberDistributed, setQuantityDistributed, setIsItemDistributed } =
  form7Slice.actions;

export default form7Slice.reducer;
