import { ApiResponse } from "../models/api-response";
import { retriveAxiosErrorResponse, retriveAxiosSuccessResponse } from "./axios-response";
import { HttpBaseService } from "./http-base.service";
import { server } from "../server/server";

export class AuthService extends HttpBaseService {

    static classInstance;
    static apiBaseUrl = `${server}/auth`;

    constructor() {
        super("", AuthService.apiBaseUrl);
    }

    static getInstance() {

        if (!this.classInstance) {
            this.classInstance = new AuthService();
        }

        return this.classInstance;
    }

    login(userLoginDto) {
        let apiResponse = new ApiResponse();
        return this.instance.post('/login', userLoginDto).then(res => {
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        }).catch(err => {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        });
    }

    signOut() {
        return new Promise((resolve) => {
            localStorage.clear();
            resolve(true);
        });
    }

    getConnectedUserFromLocalStorage() {
        return new Promise((resolve) => {
            const user = localStorage.getItem("user");
            if (user?.length)
                resolve(JSON.parse(user));
            resolve(null);
        });
    }

    setConnectedUserToLocalStorage(user) {
        return new Promise((resolve) => {
            localStorage.setItem("user", JSON.stringify(user));
            resolve(true);
        });
    }
}