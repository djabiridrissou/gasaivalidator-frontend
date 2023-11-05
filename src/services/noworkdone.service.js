import { ApiResponse } from "../models/api-response";
import { retriveAxiosErrorResponse, retriveAxiosSuccessResponse } from "./axios-response";
import { HttpBaseService } from "./http-base.service";
import { server } from "../server/server"

export class NoWorkDoneService extends HttpBaseService {

    static classInstance;
    static apiBaseUrl = `${server}/gifmis/work-not-done`;

    constructor() {
        super("", NoWorkDoneService.apiBaseUrl);
    }

    static getInstance() {

        if (!this.classInstance) {
            this.classInstance = new NoWorkDoneService();
        }

        return this.classInstance;
    }

    async getAll(page) {
        let apiResponse = new ApiResponse();
        return this.instance.get(`?page=${page}`).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }
}