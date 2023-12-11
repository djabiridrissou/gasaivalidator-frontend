import { ApiResponse } from "../models/api-response";
import { retriveAxiosErrorResponse, retriveAxiosSuccessResponse } from "./axios-response";
import { HttpBaseService } from "./http-base.service";
import { server } from "../server/server";

export class UserService extends HttpBaseService {

    static classInstance;
    static apiBaseUrl = `${server}/users`;

    constructor() {
        super("", UserService.apiBaseUrl);
    }

    static getInstance() {

        if (!this.classInstance) {
            this.classInstance = new UserService();
        }

        return this.classInstance;
    }

    async addUser(addUserDto) {
        let apiResponse = new ApiResponse();
        try {
            const res = await this.instance.post('/', addUserDto);
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        } catch (err) {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        }
    }

    async getUsers() {
        let apiResponse = new ApiResponse();
        return this.instance.get('').then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    async updateUser(id, userData) {
        let apiResponse = new ApiResponse();
        try {
            const res = await this.instance.post(`/${id}`, userData);
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        } catch (err) {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        }
    }
}