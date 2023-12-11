import { ApiResponse } from "../../models/api-response";
import { retriveAxiosErrorResponse, retriveAxiosSuccessResponse } from "../axios-response";
import { HttpBaseService } from "../http-base.service";
import { server } from "../../server/server";

export class SupplyersRepService extends HttpBaseService {

    static classInstance;
    static apiBaseUrl = `${server}/gifmis/with-suppliance`;

    constructor() {
        super("", SupplyersRepService.apiBaseUrl);
    }

    static getInstance() {

        if (!this.classInstance) {
            this.classInstance = new SupplyersRepService();
        }

        return this.classInstance;
    }

    async getSupplyersRepo(page, searchTerm) {
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