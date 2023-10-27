// formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isItemDistributed: false,
  filelabelnumber: "",
  quantitydistributed: "",
};

const form7EditSlice = createSlice({
  name: "form7Edit",
  initialState,
  reducers: {
    toggleIsItemDistributed: (state) => {
      state.isItemDistributed = !state.isItemDistributed;
    },

    setFileLabelNumberItem: (state, action) => {
      state.filelabelnumber = action.payload;
    },

    setQuantityDistributed: (state, action) => {
      state.quantitydistributed = action.payload;
    },

    setIsItemDistributed: (state, action) => {
      state.isItemDistributed = action.payload;
    },
  },
});

export const { toggleIsItemDistributed, setFileLabelNumberItem, setQuantityDistributed, setIsItemDistributed } =
  form7EditSlice.actions;

export default form7EditSlice.reducer;
