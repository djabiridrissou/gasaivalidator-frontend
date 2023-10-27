export const retriveAxiosSuccessResponse = (res, data) => {
    return {
        status: res.status,
        message: res.data.message,
        success: res.data.success,
        data: data ? res.data.data[data] : res.data.data,
    }
};

export const retriveAxiosErrorResponse = (res) => {
    return {
        status: res.response.status,
        message: res.response.data.message,
        success: res.response.data.success,
        error: res.response.data.data,
    }
};