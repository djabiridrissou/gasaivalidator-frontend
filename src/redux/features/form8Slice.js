// formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  availableInStore: false,
  anyAvailableInStore: false,
  fileLabelNumber: "",
  quantityInStore: "",
  itemDistributedInStore: false,
  itemDistributedNotInStore: false,
  fileLabelNumber1: "",
  quantityInStore1: "",
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

    setNotAvailableInStore: (state, action) => {
      state.notAvailableInStore = action.payload;
    },
    setFileLabelNumber: (state, action) => {
      state.fileLabelNumber = action.payload;
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

    setFileLabelNumber1: (state, action) => {
      state.fileLabelNumber1 = action.payload;
    },

    setQuantityInStore1: (state, action) => {
      state.quantityInStore1 = action.payload;
    },
  },
});

export const {
  setAvailableInStore,
  setNotAvailableInStore,
  setFileLabelNumber,
  setQuantityInStore,
  setItemDistributedNotInStore,
  setItemDistributedInStore,
  setQuantityInStore1,
  setFileLabelNumber1,
  toggleAvailableInStore,
  toggleAnyAvailableInStore,
} = form8Slice.actions;

export default form8Slice.reducer;
