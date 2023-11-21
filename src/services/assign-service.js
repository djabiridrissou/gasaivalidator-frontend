import { ApiResponse } from "../models/api-response";
import { retriveAxiosErrorResponse, retriveAxiosSuccessResponse } from "./axios-response";
import { HttpBaseService } from "./http-base.service";
import { server } from "../server/server"

export class AssignService extends HttpBaseService {

    static classInstance;
    static apiBaseUrl = `${server}/gifmis-user`;

    constructor() {
        super("", AssignService.apiBaseUrl);
    }

    static getInstance() {

        if (!this.classInstance) {
            this.classInstance = new AssignService();
        }

        return this.classInstance;
    }

    
    async assignGifmis(data) {
        let apiResponse = new ApiResponse();
        return this.instance.post(`/`, data).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async deleteGifmisUser(data) {
        let apiResponse = new ApiResponse();
        return this.instance.delete(`/user/${data.userId}`).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async deleteSomeGifmisUser(data) {
        let apiResponse = new ApiResponse();
        return this.instance.post(`/ids`, data).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }
}