// cargoInvoiceActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { server } from "../../../server/server";
import axios from "axios";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";

// Action pour récupérer les données de cargo depuis le serveur
//console.log("dans action");

export const fetchUclData = createAsyncThunk(
  'ucl/fetchData',
  async ({page, limit, searchTerm, sortField, sortOrder }) => {
    try {
      //console.log("searchTerm", searchTerm);
      const response = await axios.get(
        `${server}/gifmis?page=${page}&limit=${limit}&searchTerm=${searchTerm}&sortField=${sortField}&sortOrder=${sortOrder}`
      );
      const uclData = response.data.data;
      const totalPages = response.data.totalPages;
      //console.log("ucllengthdansaction", uclData.length);
      return { uclData: uclData, totalPages: totalPages};
    } catch (error) {
      console.log(error);
    }
  }
);

// Action pour mettre à jour la limite par page
export const setLimit = (limit) => {
  return { type: 'ucl/setLimit', limit };
};

// Action pour mettre à jour le terme de recherche
export const setSearchTerm = (searchTerm) => {
  return { type: 'ucl/setSearchTerm', searchTerm };
};

// Action pour mettre à jour le champ de tri
export const setSortField = (field) => {
  return { type: 'ucl/setSortField', field };
};

// Action pour mettre à jour l'ordre de tri
export const setSortOrder = (order) => {
  return { type: 'ucl/setSortOrder', order };
};

// Action pour mettre à jour la page
export const setPage = (page) => {
  return { type: 'ucl/setPage', page };
};

export const setData = (data) => {
  return { type: 'ucl/setData', data };
}
