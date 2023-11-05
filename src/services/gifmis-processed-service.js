import { ApiResponse } from "../models/api-response";
import { retriveAxiosErrorResponse, retriveAxiosSuccessResponse } from "./axios-response";
import { HttpBaseService } from "./http-base.service";
import { server } from "../server/server"

export class GifmisProcessedService extends HttpBaseService {

    static classInstance;
    static apiBaseUrl = `${server}/gifmis-processed`;

    constructor() {
        super("", GifmisProcessedService.apiBaseUrl);
    }

    static getInstance() {

        if (!this.classInstance) {
            this.classInstance = new GifmisProcessedService();
        }

        return this.classInstance;
    }

    async getAllGifmisProcessed(page) {
        let apiResponse = new ApiResponse();
        return this.instance.get(`?page=${page}`).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async addGifmisProcessed(addGifmisProcessedDto) {
        let apiResponse = new ApiResponse();
        return this.instance.post('', addGifmisProcessedDto).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async updateGifmisProcessed(updateGifmisProcessed, id) {
        let apiResponse = new ApiResponse();
        return this.instance.put(`/${id}`, updateGifmisProcessed).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }
}