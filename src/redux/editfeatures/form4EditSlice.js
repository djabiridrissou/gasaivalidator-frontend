// formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expendituretype: "",
  availablecontracts: false,
  contracts: [
    {
      contractdate: "",
      contractnumber: "",
      itemtobesupplied: "",
      quantity: "",
      unitprice: "",
      supplybeforedate: "",
      filelabelnumber: "",
    },
  ],
};

const form4EditSlice = createSlice({
  name: "form4Edit",
  initialState,
  reducers: {
    setExpenditureType: (state, action) => {
      state.expendituretype = action.payload;
    },

    addContract: (state) => {
      state.contracts.push({
        contractdate: "",
        contractnumber: "",
        itemtobesupplied: "",
        quantity: "",
        unitprice: "",
        supplybeforedate: "",
        filelabelnumber: "",
      })
    },

    updateContract: (state, action) => {
      const { index, fieldName, value } = action.payload;
      state.contracts[index][fieldName] = value;  
    },

    setAvailabeContracts: (state, action) => {
      state.availablecontracts = action.payload;
    },

    toggleAvailableContracts: (state) => {
      state.availablecontracts = !state.availablecontracts;
    },

    removeContracts: (state, action) => {
      state.contracts = action.payload;
    }, 

    setContracts: (state, action) => {
      state.contracts = action.payload;
    },
  },
});

export const {
  setExpenditureType,
  toggleAvailableContracts,
  addContract,
  updateContract,
  removeContracts,
  setContracts,
  setAvailabeContracts,
} = form4EditSlice.actions;

export default form4EditSlice.reducer;
