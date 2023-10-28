// formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  advancedPayment: false,
  transactions: [
    {
      paymentDate: "",
      pvNo: "",
      amountPaid: "",
      fileLabelNumber: "",
    },
  ],
};

const form2Slice = createSlice({
  name: "form2",
  initialState,
  reducers: {
    toggleAdvancedPayment: (state) => {
      state.advancedPayment = !state.advancedPayment;
      state.transactions = [{
        paymentDate: "",
        pvNo: "",
        amountPaid: "",
        fileLabelNumber: "",
      }];
    },

 

 /*    setTransactions: (state, action) => {
      state.transactions = action.payload;
    }, */
    addTransaction: (state) => {
      state.transactions.push({
        // invoiceAmount: "",
        paymentDate: "",
        pvNo: "",
        amountPaid: "",
        fileLabelNumber: "",
      });
    },
    updateTransaction: (state, action) => {
      console.log("dans update", action.payload);
      const { index, fieldName, value } = action.payload;
      state.transactions[index][fieldName] = value;
    },
    removeTransactions: (state, action) => {
      state.transactions = action.payload;
    },

    setAdvancedPayment: (state, action) => {
      state.advancedPayment = action.payload;
    },

    setTransactions2: (state, action) => {
      state.transactions = action.payload;
    },
  },
});

export const {
  toggleAdvancedPayment,
  addTransaction,
  updateTransaction,
  removeTransactions,
  setTransactions2,
  setAdvancedPayment,
} = form2Slice.actions;
export default form2Slice.reducer;
