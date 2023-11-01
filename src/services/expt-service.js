import { ApiResponse } from "../models/api-response";
import { retriveAxiosErrorResponse, retriveAxiosSuccessResponse } from "./axios-response";
import { HttpBaseService } from "./http-base.service";
import { server } from "../server/server"

export class ExptService extends HttpBaseService {

    static classInstance;
    static apiBaseUrl = `${server}/`;

    constructor() {
        super("", ExptService.apiBaseUrl);
    }

    static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new ExptService();
        }
        return this.classInstance;
    }

    async exportData(path) {
        let apiResponse = new ApiResponse();
        return this.instance.get(`${path}`).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return `${server}/${apiResponse.data}`;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

   /*  async exportGifmisProcessed() {
        let apiResponse = new ApiResponse();
        return this.instance.get('/gifmisprocessed').then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async exportMisclassified() {
        let apiResponse = new ApiResponse();
        return this.instance.get('/misclassified').then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async exportNoContract() {
        let apiResponse = new ApiResponse();
        return this.instance.get('/nocontract').then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    
    async exportNoIpc() {
        let apiResponse = new ApiResponse();
        return this.instance.get('/noipc').then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async exportNoJudgement() {
        let apiResponse = new ApiResponse();
        return this.instance.get('/nojudgement').then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async exportNotInGifmis() {
        let apiResponse = new ApiResponse();
        return this.instance.get('/notingifmis').then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async exportNoWarrant() {
        let apiResponse = new ApiResponse();
        return this.instance.get('/nowarrant').then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async exportNoWorkDone() {
        let apiResponse = new ApiResponse();
        return this.instance.get('/noworkdone').then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async exportSoa() {
        let apiResponse = new ApiResponse();
        return this.instance.get('/soa').then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async exportStoreManagement() {
        let apiResponse = new ApiResponse();
        return this.instance.get('/storemanagement').then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async exportContractManagement() {
        let apiResponse = new ApiResponse();
        return this.instance.get('/contractmanagement').then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    } */
}