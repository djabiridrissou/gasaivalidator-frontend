// formSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";



const initialState = {
  paymentStatus: "",
  transactions: [
    {
      // invoiceAmount: "",
      paymentdate: "",
      pvno: "",
      amountpaid: "0",
      filelabelnumber: "",
    },
  ],
};

const form1EditSlice = createSlice({
  name: "form1Edit",
  initialState,
  reducers: {
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },

    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },

    addTransaction: (state) => {
      state.transactions.push({
        // invoiceAmount: "",
        paymentdate: "",
        pvno: "",
        amountpaid: 0,
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
  setPaymentStatus,
  addTransaction,
  updateTransaction,
  removeTransactions,
  setTransactions,
} = form1EditSlice.actions;
export default form1EditSlice.reducer;
