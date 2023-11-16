import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GoodsService } from "../../services/gifmis-service";

const gifmis = GoodsService.getInstance();

// Thunks
export const getAllGifmis = createAsyncThunk(
    "gifmis/getAllGifmis",
    async ({page, searchTerm}) => {
        console.log("page", page, "search dans service", searchTerm);
        return await gifmis.getAllTransactions(page, searchTerm);
    }
);
export const countPerOrganisation = createAsyncThunk(
    "gifmis/countPerOrganisation",
    async () => await gifmis.countPerOrg()
);

export const getAllNoWarrant = createAsyncThunk(
    "gifmis/getAllNoWarrant",
    async (page) => await gifmis.getAllNoWarrant(page)
);

export const getAllNotInGifmis = createAsyncThunk(
    "gifmis/notingifmis",
    async (page) => await gifmis.getAllNotInGifmis(page)
);


export const getAllNoContract = createAsyncThunk(
    "gifmis/nocontract",
    async (page) => await gifmis.getAllNoContract(page)
);

export const getStoreManagement = createAsyncThunk(
    "gifmis/storemanagement",
    async (page) => await gifmis.getStoreManagement(page)
);

export const getContractManagement = createAsyncThunk(
    "gifmis/contractmanagement",
    async (page) => await gifmis.getContractManagement(page)
);

export const getNoIpc = createAsyncThunk(
    "gifmis/noipc",
    async (page) => await gifmis.getNoIpc(page)
);

export const getNoJudgement = createAsyncThunk(
    "gifmis/nojudgement",
    async (page) => await gifmis.getNoJudgement(page)
);

export const getSoa = createAsyncThunk(
    "gifmis/soa",
    async (page) => await gifmis.getSoa(page)
);

export const getOverpayment = createAsyncThunk(
    "gifmis/overpayment",
    async (page) => await gifmis.getOverpayment(page)
);

export const getOverpaymentCount = createAsyncThunk(
    "gifmis/overpaymentcount",
    async () => await gifmis.getOverpaymentCount()
);

export const getWithoutIssue = createAsyncThunk(
    "gifmis/withoutIssue",
    async (page) => await gifmis.getWithoutIssue(page)
);

export const getFailedVisit = createAsyncThunk(
    "gifmis/failedvisit",
    async (page) => await gifmis.getFailedVisit(page)
);

export const getPerformanceIssue = createAsyncThunk(
    "gifmis/performanceIssue",
    async (page) => await gifmis.getPerformanceIssue(page)
);

export const getBtaIssued = createAsyncThunk(
    "gifmis/btaIssued",
    async (page) => await gifmis.getBtaIssued(page)
);

export const getBtaNotIssued = createAsyncThunk(
    "gifmis/btaNotIssued",
    async (page) => await gifmis.getBtaNotIssued(page)
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
    btaNotIssued: [],
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
        builder.addCase(getBtaNotIssued.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.btaNotIssued = payload.data;
            }
        })
    },
});

// export const { } = authSlice.actions;
export default gifmisSlice.reducer;