import axios, {  AxiosResponse, AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

axios.interceptors.request.use
axios.interceptors.response.use()

abstract class Interceptor<V> {
    constructor(protected client: AxiosInstance) {
        this.client.interceptors[this instanceof ResponseInterceptor ? "response" : "request"].use((conf: any) => this.onFulfilled(conf) as any, (err) => this.onRejected(err))
    }

    onFulfilled(value: V): V | Promise<V> {
        return value;
    }
    
    onRejected(error: any): any {
        return error;
    }
}

export class ResponseInterceptor extends Interceptor<AxiosResponse> {}
export class RequestInterceptor extends Interceptor<AxiosRequestConfig> {}

const RetryAfter = "Retry-After".toLowerCase()

export class RatelimitResponseInterceptor extends ResponseInterceptor {
    onRejected(error: AxiosError) {
        let response: AxiosResponse, retryAfter: number;

        if ((response = error.response!) && (response.status === 429) && (retryAfter = +response.headers[RetryAfter]) && !isNaN(retryAfter)) {
            console.log("we send.");
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    return this.client.request(error.config).then(resolve).catch(e => {
                        console.log("we flop.");
                        throw e;
                    });
                }, (retryAfter * 1000) + 1000);
            })
        }

        return Promise.reject(error)
    }
}