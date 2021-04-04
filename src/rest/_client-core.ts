import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { BulkSearchRequest, BulkSearchResult, SearchParameters, SearchResult } from "../types/search";
import { IMHTTPClient } from "./client";
import { RatelimitResponseInterceptor } from "./ratelimit";

const deleteFn = Axios.prototype.delete = function (this: AxiosInstance, url: any, data: any, config: any) {
    return this.request(Object.assign({}, config || {}, {
        method: "delete",
        url: url,
        data: data
    }))
}

export declare interface PatchedAxios extends AxiosInstance {
    delete<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
}

export class StubHTTPClient {
    axios: PatchedAxios;

    protected get get() {
        return this.axios.get;
    }

    protected get patch() {
        return this.axios.patch;
    }

    protected get delete() {
        return this.axios.delete;
    }

    protected get post() {
        return this.axios.post;
    }

    protected get put() {
        return this.axios.put;
    }
}

export class ReliantHTTPClient extends StubHTTPClient {
    constructor(protected client: IMHTTPClient) {
        super();

        this.axios = client.axios;
    }

    public get baseURL(): string {
        return this.client.baseURL;
    }
}

export class CoreHTTPClient extends StubHTTPClient {
    constructor(baseURL: string, axios: AxiosInstance | undefined) {
        super();

        this.#baseURL = baseURL;

        if (!axios) {
            this.axios = Axios.create({ baseURL });

            new RatelimitResponseInterceptor(this.axios);
        } else {
            this.axios = axios;
        }

        this.axios.delete = deleteFn.bind(this.axios) as any;
    }

    #baseURL: string;

    get baseURL(): string {
        return this.#baseURL;
    }

    set baseURL(url: string) {
        this.axios.defaults.baseURL = this.#baseURL = url;
    }
}

export class SearchClient<Params extends SearchParameters, Result> extends ReliantHTTPClient {
    protected singleURL: string;
    protected bulkURL: string;

    using(singleURL: string, bulkURL: string): this {
        this.singleURL = singleURL;
        this.bulkURL = bulkURL;

        return this;
    }

    public async single(params: Params): Promise<Result[]> {
        const { data: { results } } = await this.get(this.singleURL, { params }) as { data: SearchResult<Result> };

        return results;
    }

    public async bulk<T extends BulkSearchRequest<Params>>(params: T): Promise<BulkSearchResult<Result, T>> {
        const { data: results } = await this.post(this.bulkURL, params) as { data: BulkSearchResult<Result, T> };

        return results;
    }
}