
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface ApiError {
    status: number;
    data: {
        message: string;
        [key: string]: any;
    };
}
