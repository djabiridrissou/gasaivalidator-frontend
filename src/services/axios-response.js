export const retriveAxiosSuccessResponse = (res) => {
    return {
        status: res.status,
        message: res.data.message,
        success: res.data.success,
        data: res.data.data,
        pages: res.data.pages,
        total: res.data.total,
        page: res.data.page,
        per_page: res.data.per_page,
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