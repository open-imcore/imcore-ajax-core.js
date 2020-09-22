import { ResourceMode } from '../types';
import { IMAttachmentClient } from "./attachment-client";
import { IMChatClient } from "./chat-client";
import { IMContactClient } from "./contact-client";
import {
    attachment, contact,

    resource
} from './endpoints';
import { IMHandleClient } from "./handle-client";
import { IMMessageClient } from "./message-client";
import { CoreHTTPClient } from "./_client-core";

export class IMHTTPClient extends CoreHTTPClient {
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

    public async getResourceMode(): Promise<ResourceMode> {
        const { data: { mode } } = await this.get(resource("mode"));

        return mode;
    }

    public chats = new IMChatClient(this);
    public attachments = new IMAttachmentClient(this);
    public contacts = new IMContactClient(this);
    public messages = new IMMessageClient(this);
    public handles = new IMHandleClient(this);
}
