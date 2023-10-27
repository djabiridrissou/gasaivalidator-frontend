// formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fundingtype: "",
  warrantsupported: false,
  warrantdate: "",
  warrantno: "",
  warrantamount: "",
  filelabelnumber: "",
};

const form3EditSlice = createSlice({
  name: "form3Edit",
  initialState,
  reducers: {
    setFundingType: (state, action) => {
      state.fundingtype = action.payload;
    },

    toggleWarrantSupported: (state) => {
      state.warrantsupported = !state.warrantsupported;
    },

    setWarrantSupported: (state, action) => {
      state.warrantsupported = action.payload;
    },

    setWarrantDate: (state, action) => {
      state.warrantdate = action.payload;
    },

    setWarrantNo: (state, action) => {
      state.warrantno = action.payload;
    },

    setWarrantAmount: (state, action) => {
      state.warrantamount = action.payload;
    },

    setFileLabelNumber: (state, action) => {
      state.filelabelnumber = action.payload;
    },
  },
});

export const {
  setFundingType,
  toggleWarrantSupported,
  setWarrantDate,
  setWarrantNo,
  setWarrantAmount,
  setFileLabelNumber,
  setWarrantSupported,
} = form3EditSlice.actions;

export default form3EditSlice.reducer;
