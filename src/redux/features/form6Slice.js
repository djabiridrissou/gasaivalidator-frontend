// formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isItemSupplied: false,
  isServiceCompleted: false,
  isWorkCompleted: false,
  regionalLocation: "",
  districtLocation: "",
  suppliances: [
    {
      sraDate: "",
      receiptBy: "",
      quantity: "",
      fileLabelNumber: "",
    }
  ],
  services: [
    {
      certificationOfCompletionDate: "",
      percentageOfCompletion: "",
      certificationIssuedBy: "",
      designation: "",
      fileLabelNumber: "",
    }
  ],
  works: [
    {
      certificationOfCompletionDate: "",
      percentageOfCompletion: "",
      certificationIssuedBy: "",
      designation: "",
      fileLabelNumber: "",
    }
  ],
};

const form6Slice = createSlice({
  name: "form6",
  initialState,
  reducers: {
    toggleIsItemSupplied: (state) => {
      state.isItemSupplied = !state.isItemSupplied;
    },

    toggleIsServiceCompleted: (state) => {
      state.isServiceCompleted = !state.isServiceCompleted;
    },

    toggleIsWorkCompleted: (state) => {
      state.isWorkCompleted = !state.isWorkCompleted;
    },

    addSuppliance: (state)  => {
      state.suppliances.push({
        sraDate: "",
      receiptBy: "",
      quantity: "",
      fileLabelNumber: "",
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

    updateWork: (state, action) => {
      const { index, fieldName, value} = action.payload;
      state.works[index][fieldName] = value;
    },


    removeSuppliances: (state, action) => {
      state.suppliances = action.payload;
    },
    setRegionalLocation: (state, action) => {
      state.regionalLocation = action.payload;
    },

    setDistrictLocation: (state, action) => {
      state.districtLocation = action.payload;
    },

    setIsItemSupplied: (state, action) => {
      state.isItemSupplied = action.payload;
    },

    setIsServiceCompleted: (state, action) => {
      state.isServiceCompleted = action.payload;
    },
    
    setIsWorkCompleted: (state, action) => {
      state.isWorkCompleted = action.payload;
    },

    setSuppliances: (state, action) => {
      state.suppliances = action.payload;
    },

    setServices: (state, action) => {
      state.services = action.payload;
    },

    setWorks: (state, action) => {
      state.works = action.payload;
    },
  },
});

export const { 
  setIsItemSupplied,
  setIsServiceCompleted,
  setIsWorkCompleted,
  setRegionalLocation,
  setDistrictLocation,
  setSuppliances,
  setServices,
  setWorks,
  toggleIsItemSupplied,
  toggleIsServiceCompleted,
  toggleIsWorkCompleted, 
  addSuppliance, 
  updateSuppliance,
  updateService,
  removeSuppliances,
  updateWork,

} = form6Slice.actions;

export default form6Slice.reducer;
