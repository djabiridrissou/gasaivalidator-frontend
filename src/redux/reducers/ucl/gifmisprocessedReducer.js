import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { server } from "../../../server/server";
import axios from "axios";

// Action asynchrone pour récupérer les données de cargo depuis le serveur

export const fetchGifmisProcessedData = createAsyncThunk(
    'gifmisprocessed/fetchData',
    async ({page, limit, searchTerm, sortField, sortOrder }) => {
      try {
        //console.log("searchTerm", searchTerm);
        const response = await axios.get(
          `${server}gifmisprocessed?page=${page}&limit=${limit}&searchTerm=${searchTerm}&sortField=${sortField}&sortOrder=${sortOrder}`
        );
        const gifmisprocessedData = response.data.data;
        const totalPages = response.data.totalPages;
        //console.log("ucllengthdansaction", uclData.length);
        return { gifmisprocessedData: gifmisprocessedData, totalPages: totalPages};
      } catch (error) {
        console.log(error);
      }
    }
  );
  
const gifmisprocessedSlice = createSlice({
  name: 'gifmisprocessed',
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
    builder.addCase(fetchGifmisProcessedData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGifmisProcessedData.fulfilled, (state, action) => {
      state.loading = false;
      state.gifmisprocessedData = action.payload.gifmisprocessedData;
      state.totalPages = action.payload.totalPages;
    });
    builder.addCase(fetchGifmisProcessedData.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setLimit, setSearchTerm, setSortField, setSortOrder, setPage, gifmisprocessedData } =
  gifmisprocessedSlice.actions;

export default gifmisprocessedSlice.reducer;
