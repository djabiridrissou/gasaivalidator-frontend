/* import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ExptService } from "../../services/expt-service";

const expt = ExptService.getInstance();

// Thunks
export const exportData = createAsyncThunk(
    "expt/gifmis",
    async () => {
        return await expt.exportGifmis();
    }
);
export const exportGifmisProcessed = createAsyncThunk(
    "expt/gifmisProcessed",
    async () => await expt.exportGifmisProcessed()
);

export const exportMisclassified = createAsyncThunk(
    "expt/misclassified",
    async () => await expt.exportMisclassified()
);

export const exportNoContract = createAsyncThunk(
    "expt/noContract",
    async () => await expt.exportNoContract()
);


export const exportNoIpc = createAsyncThunk(
    "expt/noIpc",
    async () => await expt.exportNoIpc()
);

export const exportNoJudgement = createAsyncThunk(
    "expt/noJudgement",
    async () => await expt.exportNoJudgement()
);

export const exportNotInGifmis = createAsyncThunk(
    "expt/notInGifmis",
    async () => await expt.exportNotInGifmis()
);

export const exportNoWarrant = createAsyncThunk(
    "expt/noWarrant",
    async () => await expt.exportNoWarrant()
);

export const exportNoWorkDone = createAsyncThunk(
    "expt/noWorkDone",
    async () => await expt.exportNoWorkDone()
);

export const exportSoa = createAsyncThunk(
    "expt/soa",
    async () => await expt.exportSoa()
);

export const exportStoreManagement = createAsyncThunk(
    "expt/storeManagement",
    async () => await expt.exportStoreManagement()
);

export const exportContractManagement = createAsyncThunk(
    "expt/contractManagement",
    async () => await expt.exportContractManagement()
);

const initialState = {
    contractManagement: [],
    misclassified: [],
    noWarrant: [],
    notInGifmis: [],
    noContract: [],
    storeManagement: [],
    gifmisProcessed: [],
    noIpc: [],
    noJudgement: [],
    soa: [],
    gifmis: [],
    noWorkDone: [],
};

const exptSlice = createSlice({
    name: "expt",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(exportGifmis.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.gifmis = payload.data;
            }
        });
        builder.addCase(exportGifmisProcessed.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.gifmisProcessed = payload.data;
            }
        });
        builder.addCase(exportMisclassified.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.misclassified = payload.data;
            }
        });
        builder.addCase(exportNoContract.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.noContract = payload.data;
            }
        });
        builder.addCase(exportNoIpc.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.noIpc = payload.data;
            }
        });
        builder.addCase(exportNoJudgement.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.noJudgement = payload.data;
            }
        });
        builder.addCase(exportNotInGifmis.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.notInGifmis = payload.data;
            }
        });
        builder.addCase(exportNoWarrant.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.noWarrant = payload.data;
            }
        });
        builder.addCase(exportNoWorkDone.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.noWorkDone = payload.data;
            }
        });
        builder.addCase(exportSoa.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.soa = payload.data;
            }
        });
        builder.addCase(exportStoreManagement.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.storeManagement = payload.data;
            }
        });
        builder.addCase(exportContractManagement.fulfilled, (state, { payload }) => {
            if (payload.data) {
                state.contractManagement = payload.data;
            }
        });
    },
});

// export const { } = authSlice.actions;
export default exptSlice.reducer; */