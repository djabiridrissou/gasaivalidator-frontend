// formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isItemSupplied: false,
  isServiceCompleted: false,
  suppliances: [
    {
      sradate: "",
      receiptby: "",
      quantity: "",
      filelabelnumber: "",
    }
  ],
  services: [
    {
      certificationofcompletiondate: "",
      percentageofcompletion: "",
      filelabelnumber: "",
    }
  ]
};

const form6EditSlice = createSlice({
  name: "form6Edit",
  initialState,
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload;
    },

    setSuppliances: (state, action) => {
      state.suppliances = action.payload;
    },

    setIsItemSupplied: (state, action) => {
      state.isItemSupplied = action.payload;
    },

    setIsServiceCompleted: (state, action) => {
      state.isServiceCompleted = action.payload;
    },

    toggleIsItemSupplied: (state) => {
      state.isItemSupplied = !state.isItemSupplied;
    },

    toggleIsServiceCompleted: (state) => {
      state.isServiceCompleted = !state.isServiceCompleted;
    },

    addSuppliance: (state)  => {
      state.suppliances.push({
        sradate: "",
      receiptby: "",
      quantity: "",
      filelabelnumber: "",
      })
    },

    updateSuppliance: (state, action) => {
      const { index, fieldName, value} = action.payload;
      state.suppliances[index][fieldName] = value;
    },

    updateService: (state, action) => {
      const { index, fieldName, value} = action.payload;
      state.services[index][fieldName] = value;
    },

    removeSuppliances: (state, action) => {
      state.suppliances = action.payload;
    },
  },
});

export const { 
  toggleIsItemSupplied,
  toggleIsServiceCompleted, 
  addSuppliance, 
  updateSuppliance,
  updateService,
  removeSuppliances,
  setServices,
  setSuppliances,
  setIsItemSupplied,
  setIsServiceCompleted
} = form6EditSlice.actions;

export default form6EditSlice.reducer;
