export class BaseResponse {
    isError: boolean;
    message?: string;
}

export class UserRegisterResponse extends BaseResponse {
    userId: number;
}