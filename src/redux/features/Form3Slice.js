// formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fundingType: "",
  financialYear: "",
  warrantSupported: false,
  availableBudget: false,
  warrantDate: "",
  warrantNo: "",
  warrantAmount: "",
  fileLabelNumber: "",
  budgetFileLabelNumber: "",
  statutoryFund: "",
  donors: [
    {
      donorName: "",
      pledgeAmount: "",
      fileLabelNumber: "",
    },
  ]
};

const form3Slice = createSlice({
  name: "form3",
  initialState,
  reducers: {
    setFundingType: (state, action) => {
      state.fundingType = action.payload;
    },

    toggleWarrantSupported: (state) => {
      state.warrantSupported = !state.warrantSupported;
    },

    toggleAvailableBudget: (state) => {
      state.availableBudget = !state.availableBudget;
    },

    setFinancialYear: (state, action) => {
      state.financialYear = action.payload;
    },

    setWarrantDate: (state, action) => {
      state.warrantDate = action.payload;
    },

    setWarrantNo: (state, action) => {
      state.warrantNo = action.payload;
    },

    setWarrantAmount: (state, action) => {
      state.warrantAmount = action.payload;
    },

    setFileLabelNumber: (state, action) => {
      state.fileLabelNumber = action.payload;
    },

    setBudgetFileLabelNumber: (state, action) => {
      state.budgetFileLabelNumber = action.payload;
    },

    updateDonor: (state, action) => {
      const { index, fieldName, value } = action.payload;
      state.donors[index][fieldName] = value;
    },

    setStatutoryFund: (state, action) => {
      state.statutoryFund = action.payload;
    },
  },
});

export const {
  setFundingType,
  toggleWarrantSupported,
  toggleAvailableBudget,
  setWarrantDate,
  setWarrantNo,
  setWarrantAmount,
  setFileLabelNumber,
  setFinancialYear,
  setBudgetFileLabelNumber,
  updateDonor,
  setStatutoryFund,
} = form3Slice.actions;

export default form3Slice.reducer;
