import { ResourceMode, RestTraceData, TraceType } from '../types';
import { IMAttachmentClient } from "./attachment-client";
import { IMChatClient } from "./chat-client";
import { IMContactClient } from "./contact-client";
import {
    attachment, contact,

    resource
} from './endpoints';
import { IMHandleClient } from "./handle-client";
import { IMMessageClient } from "./message-client";
import { IMSecurityClient } from "./security-client";
import { CoreHTTPClient } from "./_client-core";
import { TokenInterceptor } from "./token-interceptor";

export interface IMHTTPClientOptions {
    baseURL: string;
    trace?: (data: RestTraceData) => void;
    token?: string;
}

export class IMHTTPClient extends CoreHTTPClient {
    public token: string | undefined;

    public constructor(options: IMHTTPClientOptions = { baseURL: "http://127.0.0.1:8090" }) {
        super(options.baseURL, undefined);
        this.token = options.token;

        new TokenInterceptor(this);

        this.axios.interceptors.response.use((res) => {
            if (options.trace) {
                options.trace({
                    type: TraceType.rest,
                    timestamp: Date.now(),
                    route: res.config.url!,
                    method: res.config.method!,
                    response: {
                        status: res.status,
                        body: res.data
                    },
                    body: res.config.data
                })
            }

            return res;
        });
    }

    /**
     * Resolves the URL of a resource with the given identifier
     * @param identifier identifier to resolve
     */
    public resourceURL(identifier: string): string {
        return `${this.baseURL}${resource(identifier)}`;
    }

    /**
     * Resolves the URL of an attachment with the given ID
     * @param id ID of the URL to resolve
     */
    public attachmentURL(id: string): string {
        return `${this.baseURL}${attachment(id)}`
    }

    /**
     * Resolves the URL of the contact photo with the given contact ID
     * @param contactID contactID of the URL to resolve
     */
    public contactPhotoURL(contactID: string): string {
        return `${this.baseURL}${contact(contactID)}/photo`
    }

    public async fetchContactPhoto(contactID: string): Promise<Blob> {
        const { data } = await this.get<Blob>(this.contactPhotoURL(contactID), {
            responseType: "blob"
        });

        return data;
    }

    public async getResourceMode(): Promise<ResourceMode> {
        const { data: { mode } } = await this.get(resource("mode"));

        return mode;
    }

    public chats = new IMChatClient(this);
    public attachments = new IMAttachmentClient(this);
    public contacts = new IMContactClient(this);
    public messages = new IMMessageClient(this);
    public handles = new IMHandleClient(this);
    public security = new IMSecurityClient(this);
}
