// formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onPremise: false,
  auditorSatisfy: true,
  auditorDetails: "",
};

const form10Slice = createSlice({
  name: "form10",
  initialState,
  reducers: {
    toggleOnPremise: (state) => {
      state.onPremise = !state.onPremise;
    },

    toggleAuditorSatisfy: (state) => {
        state.auditorSatisfy = !state.auditorSatisfy;
    },

    setAuditorDetails: (state, action) => {
        state.auditorDetails = action.payload;
    },

    setOnPremise: (state, action) => {
        state.onPremise = action.payload;
    },

    setAuditorSatisfy: (state, action) => {
        state.auditorSatisfy = action.payload;
    }
  },
});

export const { 
  toggleOnPremise,
  toggleAuditorSatisfy,
  setAuditorDetails,
  setOnPremise,
  setAuditorSatisfy,
} = form10Slice.actions;

export default form10Slice.reducer;
