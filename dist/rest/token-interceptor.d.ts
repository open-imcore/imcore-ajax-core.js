import { AxiosRequestConfig } from "axios";
import { IMHTTPClient } from "./client";
import { RequestInterceptor } from "./ratelimit";
export declare class TokenInterceptor extends RequestInterceptor {
    protected imClient: IMHTTPClient;
    constructor(imClient: IMHTTPClient);
    onFulfilled(value: AxiosRequestConfig): AxiosRequestConfig;
}
//# sourceMappingURL=token-interceptor.d.ts.map