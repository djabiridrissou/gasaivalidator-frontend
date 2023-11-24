// formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    availableBta: false,
    btaDetails: [
        {
            btaDate: "",
            btaAmount: "",
            btaReferenceNumber: "",
        },
    ],
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
        },

        updateBta: (state, action) => {
            const { index, fieldName, value } = action.payload;
            state.btaDetails[index][fieldName] = value;
          },
        addBta: (state) => {
            state.btaDetails.push({
                btaDate: "",
                btaAmount: "",
                btaReferenceNumber: "",
            });
        },
        removeBta: (state, action) => {
            console.log("dans slice", action.payload);
            state.btaDetails = action.payload;
        },
    },
});

export const {
    toggleAvailableBta,
    setBtaAmount,
    setBtaDate,
    setBtaReferenceNumber,
    updateBta,
    addBta,
    removeBta,
} = form11Slice.actions;

export default form11Slice.reducer;
