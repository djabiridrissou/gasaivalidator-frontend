// formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenditureType: "",
  workType: "",
  buildingType: "",
  numberOfRooms: "",
  description: "",
  availableContracts: false,
  availableJudgement: false,
  compensationType: "",
  allowanceName: "",
  judgements: [
    {
      judgementDate: "",
      awardedJudgementAmount: "",
      fileLabelNumber: "",
      beneficiary: "",
    },
  ],
  goodsContracts: [
    {
      contractDate: "",
      contractNo: "",
      itemToBeSupplied: "",
      quantity: "",
      unitPrice: "",
      supplyBeforeDate: "",
      fileLabelNumber: "",
      contractSign: "",
    },
  ],
  servicesContracts: [
    {
      contractDate: "",
      contractNo: "",
      serviceDescription: "",
      serviceToBeDeliveredBeforeDate: "",
      fileLabelNumber: "",
      contractSign: "",
    },
  ],
  worksContracts: [
    {
      contractDate: "",
      contractNo: "",
      workDescription: "",
      workToBeDeliveredBeforeDate: "",
      fileLabelNumber: "",
      contractSign: "",
    }
  ],
  roadsContracts: [
    {
      contractDate: "",
      contractNo: "",
      totalKilometers: "",
      contractSign: "",
    }
  ],
};

const form4Slice = createSlice({
  name: "form4",
  initialState,
  reducers: {
    setExpenditureType: (state, action) => {
      //console.log("dans setExpenditureType", action.payload);
      state.expenditureType = action.payload;
    },

    updateJudgement: (state, action) => {
      const { index, fieldName, value } = action.payload;
      console.log("dans updateJudgement", index, fieldName, value);
      state.judgements[index][fieldName] = value;  
    },


    setWorkType: (state, action) => {
      state.workType = action.payload;
    },

    setCompensationType: (state, action) => {
      state.compensationType = action.payload;
    },

    setBuildingType: (state, action) => {
      state.buildingType = action.payload;
    },

    addContract: (state) => {
      state.goodsContracts.push({
        contractDate: "",
        contractNo: "",
        itemToBeSupplied: "",
        quantity: "",
        unitPrice: "",
        supplyBeforeDate: "",
        fileLabelNumber: "",
      })
    },

    addServiceContract: (state) => {
      state.servicesContracts.push({
        contractDate: "",
        contractNo: "",
        serviceDescription: "",
        serviceToBeDeliveredBeforeDate: "",
        fileLabelNumber: "",
      })
    },

    addWorksContract: (state) => {
      state.worksContracts.push({
        contractDate: "",
        contractNo: "",
        workDescription: "",
        workToBeDeliveredBeforeDate: "",
        fileLabelNumber: "",
      })
    },

    updateWorksContract: (state, action) => {
      const { index, fieldName, value } = action.payload;
      state.worksContracts[index][fieldName] = value;  
    },

    updateContract: (state, action) => {
      const { index, fieldName, value } = action.payload;
      state.goodsContracts[index][fieldName] = value;  
    },

    updateServiceContract: (state, action) => {
      const { index, fieldName, value } = action.payload;
      state.servicesContracts[index][fieldName] = value;
    },

    setAllowanceName: (state, action) => {
      state.allowanceName = action.payload;
    },

    removeWorksContract: (state, action) => {
      const { index } = action.payload;
      state.worksContracts.splice(index, 1);
    },


    removeServiceContract: (state, action) => {
      const { index } = action.payload;
      state.servicesContracts.splice(index, 1);
    },

    removeContracts: (state, action) => {
      state.goodsContracts = action.payload;
    },
    
    toggleAvailableContracts: (state) => {
      state.availableContracts = !state.availableContracts;
    },

    toggleAvailableJudgement: (state) => {
      state.availableJudgement = !state.availableJudgement;
    },

    updateRoadContract: (state, action) => {
      const { index, fieldName, value } = action.payload;
      state.roadsContracts[index][fieldName] = value;
    },

    setNumberOfRooms: (state, action) => {
      state.numberOfRooms = action.payload;
    },

    setDescription: (state, action) => {
      state.description = action.payload;
    },
  },
});

export const {
  setExpenditureType,
  setWorkType,
  toggleAvailableContracts,
  addContract,
  updateContract,
  removeContracts,
  addServiceContract,
  updateServiceContract,
  removeServiceContract,
  addWorksContract,
  updateWorksContract,
  removeWorksContract,
  updateRoadContract,
  setBuildingType,
  setNumberOfRooms,
  updateJudgement,
  toggleAvailableJudgement,
  setCompensationType,
  setAllowanceName,
  setDescription,
} = form4Slice.actions;

export default form4Slice.reducer;
