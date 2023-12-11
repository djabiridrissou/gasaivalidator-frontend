import { ApiResponse } from "../../models/api-response";
import { retriveAxiosErrorResponse, retriveAxiosSuccessResponse } from "../axios-response";
import { HttpBaseService } from "../http-base.service";
import { server } from "../../server/server";

export class RoadContractsRepService extends HttpBaseService {

    static classInstance;
    static apiBaseUrl = `${server}/gifmis/works-with-contract`;

    constructor() {
        super("", RoadContractsRepService.apiBaseUrl);
    }

    static getInstance() {

        if (!this.classInstance) {
            this.classInstance = new RoadContractsRepService();
        }

        return this.classInstance;
    }

    async getRoadContractsRepo(page, searchTerm) {
        let apiResponse = new ApiResponse();
        return this.instance.get(`?page=${page}&search=${searchTerm}`).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }
}