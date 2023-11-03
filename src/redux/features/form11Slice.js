// formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    availableBta: false,
    btaAmount: "",
    btaDate: "",
    btaReferenceNumber: "",


};

const form11Slice = createSlice({
    name: "form11",
    initialState,
    reducers: {
        toggleAvailableBta: (state) => {
            state.availableBta = !state.availableBta;
        },

        setBtaAmount: (state, action) => {
            state.btaAmount = action.payload;
        },
        setBtaDate: (state, action) => {
            state.btaDate = action.payload;
        },

        setBtaReferenceNumber: (state, action) => {
            state.btaReferenceNumber = action.payload;
        }
    },
});

export const {
    toggleAvailableBta,
    setBtaAmount,
    setBtaDate,
    setBtaReferenceNumber,
} = form11Slice.actions;

export default form11Slice.reducer;
