export const retriveAxiosSuccessResponse = (res, data) => {
    return {
        status: res.status,
        message: res.data.message,
        success: res.data.success,
        data: data ? res.data.data[data] : res.data.data,
        pages: data?.pages ? res.pages : 1,
        total: data?.total ? res.total : 1,
        page: data?.page ? res.page : 1,
        per_page: data?.per_page ? res.per_page : 1,
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