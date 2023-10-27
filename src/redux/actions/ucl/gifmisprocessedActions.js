// cargoInvoiceActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { server } from "../../../server/server";
import axios from "axios";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";

// Action pour récupérer les données de cargo depuis le serveur
//console.log("dans action");

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

// Action pour mettre à jour la limite par page
export const setLimit = (limit) => {
  return { type: 'gifmisprocessed/setLimit', limit };
};

// Action pour mettre à jour le terme de recherche
export const setSearchTerm = (searchTerm) => {
  return { type: 'gifmisprocessed/setSearchTerm', searchTerm };
};

// Action pour mettre à jour le champ de tri
export const setSortField = (field) => {
  return { type: 'gifmisprocessed/setSortField', field };
};

// Action pour mettre à jour l'ordre de tri
export const setSortOrder = (order) => {
  return { type: 'gifmisprocessed/setSortOrder', order };
};

// Action pour mettre à jour la page
export const setPage = (page) => {
  return { type: 'gifmisprocessed/setPage', page };
};

export const setData = (data) => {
  return { type: 'gifmisprocessed/setData', data };
}
