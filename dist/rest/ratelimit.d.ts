import { AxiosResponse, AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
declare abstract class Interceptor<V> {
    protected client: AxiosInstance;
    constructor(client: AxiosInstance);
    onFulfilled(value: V): V | Promise<V>;
    onRejected(error: any): any;
}
export declare class ResponseInterceptor extends Interceptor<AxiosResponse> {
}
export declare class RequestInterceptor extends Interceptor<AxiosRequestConfig> {
}
export declare class RatelimitResponseInterceptor extends ResponseInterceptor {
    onRejected(error: AxiosError): Promise<unknown>;
}
export {};
//# sourceMappingURL=ratelimit.d.ts.map