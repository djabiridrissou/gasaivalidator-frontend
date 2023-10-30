// formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ipcSupported: false,
  ipcDetails: [
    {
      ipcDate: "",
      ipcNumber: "",
      ipcAmount: "0",
      fileLabelNumber: "",
    },
  ],
};

const form9Slice = createSlice({
  name: "form9",
  initialState,
  reducers: {

    toggleIpcSupported: (state) => {
      state.ipcSupported = !state.ipcSupported;
    },

    updateIpc: (state, action) => {
      const { index, fieldName, value } = action.payload;
      state.ipcDetails[index][fieldName] = value;
    },

    setIpcSupported: (state, action) => {
      state.ipcSupported = action.payload;
    },

    setIpcDetails: (state, action) => {
      state.ipcDetails = action.payload;
    },
  },
});

export const {
  toggleIpcSupported,
  updateIpc,
  setIpcSupported,
  setIpcDetails,
} = form9Slice.actions;

export default form9Slice.reducer;
