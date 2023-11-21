import { ApiResponse } from "../models/api-response";
import { retriveAxiosErrorResponse, retriveAxiosSuccessResponse } from "./axios-response";
import { HttpBaseService } from "./http-base.service";
import { server } from "../server/server"

export class GoodsService extends HttpBaseService {

    static classInstance;
    static apiBaseUrl = `${server}/gifmis`;

    constructor() {
        super("", GoodsService.apiBaseUrl);
    }

    static getInstance() {

        if (!this.classInstance) {
            this.classInstance = new GoodsService();
        }

        return this.classInstance;
    }

    async getAllTransactions(page, searchTerm) {
        let apiResponse = new ApiResponse();
        console.log("page", page, "search", (searchTerm));
        return this.instance.get(`/user?page=${page}&search=${searchTerm}`).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            console.log("all", res["pages"]);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }
    
    async getGifmisUser(page, id) {
        let apiResponse = new ApiResponse();
        return this.instance.get(`/user/${id}?page=${page}`).then(res => {
            console.log("id dans get gifmisuser", id);
            apiResponse = retriveAxiosSuccessResponse(res);
            console.log("all user transac", res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async countPerOrg() {
        let apiResponse = new ApiResponse();
        return this.instance.get('/count/org').then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async getAllNoWarrant(page) {
        let apiResponse = new ApiResponse();
        return this.instance.get(`/no-warrant?page=${page}`).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async getAllNotInGifmis(page) {
        let apiResponse = new ApiResponse();
        return this.instance.get(`/not-in-gifmis?page=${page}`).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }


    async getAllNoContract(page) {
        let apiResponse = new ApiResponse();
        return this.instance.get(`/no-contract?page=${page}`).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async getStoreManagement(page) {
        let apiResponse = new ApiResponse();
        return this.instance.get(`/store-management?page=${page}`).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async getContractManagement(page) {
        let apiResponse = new ApiResponse();
        return this.instance.get(`/contract-management?page=${page}`).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async getNoIpc(page) {
        let apiResponse = new ApiResponse();
        return this.instance.get(`/no-ipc?page=${page}`).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async getNoJudgement(page) {
        let apiResponse = new ApiResponse();
        return this.instance.get(`/no-judgement?page=${page}`).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async getSoa(page) {
        let apiResponse = new ApiResponse();
        return this.instance.get(`/soa?page=${page}`).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async getOverpayment(page) {
        let apiResponse = new ApiResponse();
        return this.instance.get(`/overpayment?page=${page}`).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    
    async getOverpaymentCount(page) {
        let apiResponse = new ApiResponse();
        return this.instance.get(`/overpayment-count?page=${page}`).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async getOverpayment(page) {
        let apiResponse = new ApiResponse();
        return this.instance.get(`/overpayment?page=${page}`).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async getWithoutIssue(page) {
        let apiResponse = new ApiResponse();
        return this.instance.get(`/without-issue?page=${page}`).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async getFailedVisit(page) {
        let apiResponse = new ApiResponse();
        return this.instance.get(`/failed-visit?page=${page}`).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

 

    async getPerformanceIssue(page) {
        let apiResponse = new ApiResponse();
        return this.instance.get(`/performance-issue?page=${page}`).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    
    async getBtaIssued(page) {
        let apiResponse = new ApiResponse();
        return this.instance.get(`/bta-issued?page=${page}`).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }
    async getBtaNotIssued(page) {
        let apiResponse = new ApiResponse();
        return this.instance.get(`/bta-not-issued?page=${page}`).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async assignGifmis(data) {
        let apiResponse = new ApiResponse();
        return this.instance.post(`/gifmis-user`, data).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async deleteGifmisUser(data) {
        let apiResponse = new ApiResponse();
        return this.instance.delete(`/gifmis-user/user`, data).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

   
}