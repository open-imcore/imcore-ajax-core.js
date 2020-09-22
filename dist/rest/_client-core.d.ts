import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { BulkSearchRequest, BulkSearchResult, SearchParameters } from "../types/search";
import { IMHTTPClient } from "./client";
export declare interface PatchedAxios extends AxiosInstance {
    delete<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
}
export declare class StubHTTPClient {
    axios: PatchedAxios;
    protected get get(): <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig | undefined) => Promise<R>;
    protected get patch(): <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig | undefined) => Promise<R>;
    protected get delete(): <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig | undefined) => Promise<R>;
    protected get post(): <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig | undefined) => Promise<R>;
    protected get put(): <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig | undefined) => Promise<R>;
}
export declare class ReliantHTTPClient extends StubHTTPClient {
    protected client: IMHTTPClient;
    constructor(client: IMHTTPClient);
    get baseURL(): string;
}
export declare class CoreHTTPClient extends StubHTTPClient {
    readonly baseURL: string;
    constructor(baseURL: string, axios: AxiosInstance | undefined);
}
export declare class SearchClient<Params extends SearchParameters, Result> extends ReliantHTTPClient {
    protected singleURL: string;
    protected bulkURL: string;
    using(singleURL: string, bulkURL: string): this;
    single(params: Params): Promise<Result[]>;
    bulk<T extends BulkSearchRequest<Params>>(params: T): Promise<BulkSearchResult<Result, T>>;
}
//# sourceMappingURL=_client-core.d.ts.map