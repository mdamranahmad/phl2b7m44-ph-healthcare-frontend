export interface ApiError extends Error {
    data?: {
        message?: string;
        success?: boolean;
    };
    response?: {
        data?: {
            message?: string;
        };
    };
}
