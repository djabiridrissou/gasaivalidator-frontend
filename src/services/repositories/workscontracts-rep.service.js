import { ApiResponse } from "../../models/api-response";
import { retriveAxiosErrorResponse, retriveAxiosSuccessResponse } from "../axios-response";
import { HttpBaseService } from "../http-base.service";
import { server } from "../../server/server";

export class WorksContractsRepService extends HttpBaseService {

    static classInstance;
    static apiBaseUrl = `${server}/gifmis/other-works-with-contract`;

    constructor() {
        super("", WorksContractsRepService.apiBaseUrl);
    }

    static getInstance() {

        if (!this.classInstance) {
            this.classInstance = new WorksContractsRepService();
        }

        return this.classInstance;
    }

    async getWorksContractsRepo(page, searchTerm) {
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