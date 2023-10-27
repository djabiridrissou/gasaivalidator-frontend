// formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactioningifmis: false,
  purchaseorderno: "",
  invoiceno: "",
  filelabelnumber: "",
};

const form5EditSlice = createSlice({
  name: "form5Edit",
  initialState,
  reducers: {
    toggleTransactionInGIFMIS: (state) => {
      state.transactioningifmis = !state.transactioningifmis;
    },

    setPurchaseOrderNo: (state, action) => {
      state.purchaseorderno = action.payload;
    },

    setInvoiceNo: (state, action) => {
      state.invoiceno = action.payload;
    },

    setFileLabelNumberGifmis: (state, action) => {
      state.filelabelnumber = action.payload;
    },

    setTransactionInGifmis: (state, action) => {
      state.transactioningifmis = action.payload;
    },
  },
});

export const {
  toggleTransactionInGIFMIS,
  setPurchaseOrderNo,
  setInvoiceNo,
  setTransactionInGifmis,
  setFileLabelNumberGifmis,
} = form5EditSlice.actions;

export default form5EditSlice.reducer;
