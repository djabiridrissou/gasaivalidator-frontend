import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { server } from "../../../server/server";
import axios from "axios";

// Action asynchrone pour récupérer les données de cargo depuis le serveur

export const fetchUclData = createAsyncThunk(
  'ucl/fetchData',
  async ({page, limit, searchTerm, sortField, sortOrder }) => {
    try {
      const response = await axios.get(
        `${server}gifmis?page=${page}&limit=${limit}&searchTerm=${searchTerm}&sortField=${sortField}&sortOrder=${sortOrder}`
      );
      const uclData = response.data.data;
      const totalPages = response.data.totalPages;
      return { uclData: uclData, totalPages: totalPages};
    } catch (error) {
      console.log(error);
    }
  }
);

const uclSlice = createSlice({
  name: 'ucl',
  initialState: {
    uclData: [],
    page: 1,
    totalPages: 1,
    loading: true,
    limit: 25,
    searchTerm: '',
    sortField: '',
    sortOrder: 'asc',
  },
  reducers: {
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      console.log("dans state");
    },
    setSortField: (state, action) => {
      state.sortField = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setData: (state, action) => {
      state.uclData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUclData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUclData.fulfilled, (state, action) => {
      state.loading = false;
      state.uclData = action.payload.uclData;
      state.totalPages = action.payload.totalPages;
    });
    builder.addCase(fetchUclData.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setLimit, setSearchTerm, setSortField, setSortOrder, setPage, uclData } =
  uclSlice.actions;

export default uclSlice.reducer;
