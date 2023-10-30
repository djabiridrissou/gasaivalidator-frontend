// formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactionInGIFMIS: false,
  purchaseOrderNo: "",
  invoiceNo: "",
  invoiceDate: "",
  fileLabelNumber: "",
};

const form5Slice = createSlice({
  name: "form5",
  initialState,
  reducers: {
    toggleTransactionInGIFMIS: (state) => {
      state.transactionInGIFMIS = !state.transactionInGIFMIS;
    },

    setPurchaseOrderNo: (state, action) => {
      state.purchaseOrderNo = action.payload;
    },

    setInvoiceNo: (state, action) => {
      state.invoiceNo = action.payload;
    },

    setFileLabelNumberGifmis: (state, action) => {
      state.fileLabelNumber = action.payload;
    },

    setInvoiceDate: (state, action) => {
      state.invoiceDate = action.payload;
    },

    setTransactionInGifmis: (state, action) => {
      state.transactionInGIFMIS = action.payload;
    },
  },
});

export const {
  toggleTransactionInGIFMIS,
  setPurchaseOrderNo,
  setInvoiceNo,
  setFileLabelNumberGifmis,
  setInvoiceDate,
  setTransactionInGifmis,
} = form5Slice.actions;

export default form5Slice.reducer;
