// formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentStatus: "",
};

const paymentStatusSlice = createSlice({
  name: "paymentStatus",
  initialState,
  reducers: {
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
  },
});

export const { setPaymentStatus } = paymentStatusSlice.actions;
export default paymentStatusSlice.reducer;
