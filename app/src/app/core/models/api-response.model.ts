export interface ApiResponse<T = any> {
    status: boolean,
    message?: string | null,
    data?: T | null
}