import { ApiResponse } from "../models/api-response";
import { retriveAxiosErrorResponse, retriveAxiosSuccessResponse } from "./axios-response";
import { HttpBaseService } from "./http-base.service";
import { server } from "../server/server"

export class MisclassifiedService extends HttpBaseService {

    static classInstance;
    static apiBaseUrl = `${server}/misclassified`;

    constructor() {
        super("", MisclassifiedService.apiBaseUrl);
    }

    static getInstance() {

        if (!this.classInstance) {
            this.classInstance = new MisclassifiedService();
        }

        return this.classInstance;
    }

    async getAllMisclassified() {
        let apiResponse = new ApiResponse();
        return this.instance.get('/').then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }
}