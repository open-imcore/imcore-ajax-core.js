import { AxiosRequestConfig } from "axios";
import { IMHTTPClient } from "./client";
import { RequestInterceptor } from "./ratelimit";

export class TokenInterceptor extends RequestInterceptor {
    constructor(protected imClient: IMHTTPClient) {
        super(imClient.axios);
    }

    onFulfilled(value: AxiosRequestConfig) {
        if (typeof value.headers !== "undefined") value.headers = {};
        if (this.imClient.token) value.headers!["Authorization"] = this.imClient.token;

        return value;
    }
}