// formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  availableInStore: false,
  anyAvailableInStore: false,
  fileLabelNumberInStore: "",
  quantityInStore: "",
  itemDistributedInStore: false,
  itemDistributedNotInStore: false,
  setFileLabelNumberSendToStore: "",
  quantitySendToStore: "",
};

const form8Slice = createSlice({
  name: "form8",
  initialState,
  reducers: {
    setAvailableInStore: (state, action) => {
      state.availableInStore = action.payload;
    },

    toggleAvailableInStore: (state) => {
      state.availableInStore = !state.availableInStore;
    },

    toggleAnyAvailableInStore: (state) => {
      state.anyAvailableInStore = !state.anyAvailableInStore;
    },

    setAnyAvailableInStore: (state, action) => {
      state.anyAvailableInStore = action.payload;
    },
    setFileLabelNumberInStore: (state, action) => {
      state.fileLabelNumberInStore = action.payload;
    },

    setQuantityInStore: (state, action) => {
      state.quantityInStore = action.payload;
    },

    setItemDistributedInStore: (state, action) => {
      state.itemDistributedInStore = action.payload;
    },

    setItemDistributedNotInStore: (state, action) => {
      state.itemDistributedNotInStore = action.payload;
    },

    setFileLabelNumberSendToStore: (state, action) => {
      state.setFileLabelNumberSendToStore = action.payload;
    },

    setQuantitySendToStore: (state, action) => {
      state.quantitySendToStore = action.payload;
    },
  },
});

export const {
  setAvailableInStore,
  setAnyAvailableInStore,
  setQuantityInStore,
  setFileLabelNumberInStore,
  setItemDistributedNotInStore,
  setItemDistributedInStore,
  setQuantitySendToStore,
  setFileLabelNumberSendToStore,
  setFileLabelNumber1,
  toggleAvailableInStore,
  toggleAnyAvailableInStore,
} = form8Slice.actions;

export default form8Slice.reducer;
