// formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentStatus: "",
  isJobDone: false,
  transactions: [
    {
      // invoiceAmount: "",
      paymentDate: "",
      pvNo: "",
      amountPaid: "",
      fileLabelNumber: "",
    },
  ],
};

const form1Slice = createSlice({
  name: "form1",
  initialState,
  reducers: {
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },

    
    toggleIsJobDone (state) {
      state.isJobDone = !state.isJobDone
    },

    setIsJobDone: (state, action) => {
      state.isJobDone = action.payload;
    },

    addTransaction: (state) => {
      state.transactions.push({
        // invoiceAmount: "",
        paymentDate: "",
        pvNo: "",
        amountPaid: 0,
        fileLabelNumber: "",
      });
    },
    updateTransaction: (state, action) => {
      const { index, fieldName, value } = action.payload;
      state.transactions[index][fieldName] = value;
    },
    removeTransactions: (state, action) => {
      state.transactions = action.payload;
    },

    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
  },
});

export const {
  setPaymentStatus,
  addTransaction,
  updateTransaction,
  removeTransactions,
  setTransactions,
  toggleIsJobDone,
  setIsJobDone,
} = form1Slice.actions;
export default form1Slice.reducer;
