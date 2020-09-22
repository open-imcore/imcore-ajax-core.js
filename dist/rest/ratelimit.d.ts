import { AxiosResponse, AxiosError, AxiosInstance } from "axios";
declare abstract class Interceptor<V> {
    protected client: AxiosInstance;
    constructor(client: AxiosInstance);
    onFulfilled(value: V): V | Promise<V>;
    onRejected(error: any): any;
    register(axios: AxiosInstance): void;
}
declare class ResponseInterceptor extends Interceptor<AxiosResponse> {
}
export declare class RatelimitResponseInterceptor extends ResponseInterceptor {
    onRejected(error: AxiosError): Promise<unknown>;
}
export {};
//# sourceMappingURL=ratelimit.d.ts.map