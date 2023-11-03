import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GoodsService } from "../../services/gifmis-service";

const gifmis = GoodsService.getInstance();

// Thunks
export const getAllGifmis = createAsyncThunk(
    "gifmis/getAllGifmis",
    async (page, limitR) => {
        console.log("page", page, "limit dans service", (limitR));
        return await gifmis.getAllTransactions(page, limitR);
    }
);
export const countPerOrganisation = createAsyncThunk(
    "gifmis/countPerOrganisation",
    async () => await gifmis.countPerOrg()
);

export const getAllNoWarrant = createAsyncThunk(
    "gifmis/getAllNoWarrant",
    async () => await gifmis.getAllNoWarrant()
);

export const getAllNotInGifmis = createAsyncThunk(
    "gifmis/notingifmis",
    async () => await gifmis.getAllNotInGifmis()
);


export const getAllNoContract = createAsyncThunk(
    "gifmis/nocontract",
    async () => await gifmis.getAllNoContract()
);

export const getStoreManagement = createAsyncThunk(
    "gifmis/storemanagement",
    async () => await gifmis.getStoreManagement()
);

export const getContractManagement = createAsyncThunk(
    "gifmis/contractmanagement",
    async () => await gifmis.getContractManagement()
);

export const getNoIpc = createAsyncThunk(
    "gifmis/noipc",
    async () => await gifmis.getNoIpc()
);

export const getNoJudgement = createAsyncThunk(
    "gifmis/nojudgement",
    async () => await gifmis.getNoJudgement()
);

export const getSoa = createAsyncThunk(
    "gifmis/soa",
    async () => await gifmis.getSoa()
);

export const getOverpayment = createAsyncThunk(
    "gifmis/overpayment",
    async () => await gifmis.getOverpayment()
);

export const getWithoutIssue = createAsyncThunk(
    "gifmis/withoutIssue",
    async () => await gifmis.getWithoutIssue()
);

export const getFailedVisit = createAsyncThunk(
    "gifmis/failedvisit",
    async () => await gifmis.getFailedVisit()
);

export const getPerformanceIssue = createAsyncThunk(
    "gifmis/performanceIssue",
    async () => await gifmis.getPerformanceIssue()
);

export const getBtaIssued = createAsyncThunk(
    "gifmis/btaIssued",
    async () => await gifmis.getBtaIssued()
);



const initialState = {
    transactions: [],
    transactionsPerOrg: [],
    noWarrant: [],
    notInGifmis: [],
    noContract: [],
    storeManagement: [],
    contractManagement: [],
    noIpc: [],
    noJudgement: [],
    soa: [],
    overpayment: [],
    withoutIssue: [],
    failedvisit: [],
    performanceIssue: [],
    btaIssued: [],
};

const gifmisSlice = createSlice({
    name: "gifmis",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getAllGifmis.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.transactions = payload.data;
            }
        });
        builder.addCase(countPerOrganisation.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.transactionsPerOrg = payload.data;
            }
        });
        builder.addCase(getAllNoWarrant.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.noWarrant = payload.data;
            }
        });
        builder.addCase(getAllNotInGifmis.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.notInGifmis = payload.data;
            }
        });
        builder.addCase(getAllNoContract.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.noContract = payload.data;
            }
        });
        builder.addCase(getStoreManagement.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.storeManagement = payload.data;
            }
        });
        builder.addCase(getContractManagement.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.contractManagement = payload.data;
            }
        });
        builder.addCase(getNoIpc.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.noIpc = payload.data;
            }
        });
        builder.addCase(getNoJudgement.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.noJudgement = payload.data;
            }
        });
        builder.addCase(getSoa.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.soa = payload.data;
            }
        });
        builder.addCase(getOverpayment.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.overpayment = payload.data;
            }
        });
        builder.addCase(getWithoutIssue.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.withoutIssue = payload.data;
            }
        });
        builder.addCase(getFailedVisit.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.failedvisit = payload.data;
            }
        });
        builder.addCase(getPerformanceIssue.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.performanceIssue = payload.data;
            }
        });
        builder.addCase(getBtaIssued.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.btaIssued = payload.data;
            }
        });
    },
});

// export const { } = authSlice.actions;
export default gifmisSlice.reducer;