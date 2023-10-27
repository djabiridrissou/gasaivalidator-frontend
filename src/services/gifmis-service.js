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

    async getAllTransactions() {
        let apiResponse = new ApiResponse();
        return this.instance.get('/user').then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
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
}