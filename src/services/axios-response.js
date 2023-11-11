export const retriveAxiosSuccessResponse = (res) => {
    return {
        status: res.status,
        message: res.data.message,
        data: res.data.data,
        pages: res.data.pages,
        total: res.data.total,
        page: res.data.page,
        per_page: res.data.per_page,
    }
};

export const retriveAxiosErrorResponse = (res) => {
    if (res.response.status == 401) {
        location.href = "/";
    }
    return {
        status: res.status,
        message: res.data.message,
        error: res.data.data,
    }
};