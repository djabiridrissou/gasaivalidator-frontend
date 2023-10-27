import { ApiResponse } from "../models/api-response";
import { retriveAxiosErrorResponse, retriveAxiosSuccessResponse } from "./axios-response";
import { HttpBaseService } from "./http-base.service";
import { server } from "../server/server";

export class UploadService extends HttpBaseService {

    static classInstance;
    static apiBaseUrl = `${server}/upload`;

    constructor() {
        super("", UploadService.apiBaseUrl);
    }

    static getInstance() {

        if (!this.classInstance) {
            this.classInstance = new UploadService();
        }

        return this.classInstance;
    }

    uploadGifmis(uploadDto) {
        let apiResponse = new ApiResponse();
        return this.instance.post('/gifmis-user', uploadDto).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }
}