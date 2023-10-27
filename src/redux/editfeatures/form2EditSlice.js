// formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  advancedPayment: false,
  transactions: [
    {
      paymentdate: "",
      pvno: "",
      amountpaid: "",
      filelabelnumber: "",
    },
  ],
};

const form2EditSlice = createSlice({
  name: "form2Edit",
  initialState,
  reducers: {
    toggleAdvancedPayment: (state) => {
      state.advancedPayment = !state.advancedPayment;
      state.transactions = [{
        paymentdate: "",
        pvno: "",
        amountpaid: "",
        filelabelnumber: "",
      }];
    },

    setAdvancedPayment: (state, action) => {
      state.advancedPayment = action.payload;
    },

    setTransactions2: (state, action) => {
      state.transactions = action.payload;
    },

    addTransaction: (state) => {
      state.transactions.push({
        // invoiceAmount: "",
        paymentdate: "",
        pvno: "",
        amountpaid: "",
        filelabelnumber: "",
      });
    },
    updateTransaction: (state, action) => {
      const { index, fieldName, value } = action.payload;
      state.transactions[index][fieldName] = value;
    },
    removeTransactions: (state, action) => {
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
} = form2EditSlice.actions;
export default form2EditSlice.reducer;
