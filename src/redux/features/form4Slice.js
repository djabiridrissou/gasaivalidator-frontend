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

    setAvailableContracts: (state, action) => {
      state.availableContracts = action.payload;
    },

    setAvailableJudgement: (state, action) => {
      state.availableJudgement = action.payload;
    },

    setJudgements: (state, action) => {
      state.judgements = action.payload;
    },

    setGoodsContracts: (state, action) => {
      state.goodsContracts = action.payload;
    },

    setServicesContracts: (state, action) => {
      state.servicesContracts = action.payload;
    },

    setWorksContracts: (state, action) => {
      state.worksContracts = action.payload;
    },

    setRoadsContracts: (state, action) => {
      state.roadsContracts = action.payload;
    },

  },
});

export const {
  setExpenditureType,
  setWorkType,
  setBuildingType,
  setNumberOfRooms,
  setDescription,
  setAvailableContracts,
  toggleAvailableContracts,
  setAvailableJudgement,
  toggleAvailableJudgement,
  setCompensationType,
  setJudgements,
  setGoodsContracts,
  setServicesContracts,
  setWorksContracts,
  setRoadsContracts,
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
  updateJudgement,
  setAllowanceName,
} = form4Slice.actions;

export default form4Slice.reducer;
