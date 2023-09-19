export type Method = "POST" | "GET" | "DELETE" | "PUT" | "PATCH";

export type ServerAppError = {
    error: string;
    message: string;
    statusCode: number
}
export type CustomResponse<Res> = {
    ok: boolean,
    data: ServerAppError | Res
}

export type LoginResponse = {
    access_token: string
}