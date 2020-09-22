import { ResourceMode } from '../types';
import { IMAttachmentClient } from "./attachment-client";
import { IMChatClient } from "./chat-client";
import { IMContactClient } from "./contact-client";
import { IMHandleClient } from "./handle-client";
import { IMMessageClient } from "./message-client";
import { CoreHTTPClient } from "./_client-core";
export declare class IMHTTPClient extends CoreHTTPClient {
    /**
     * Resolves the URL of a resource with the given identifier
     * @param identifier identifier to resolve
     */
    resourceURL(identifier: string): string;
    /**
     * Resolves the URL of an attachment with the given ID
     * @param id ID of the URL to resolve
     */
    attachmentURL(id: string): string;
    /**
     * Resolves the URL of the contact photo with the given contact ID
     * @param contactID contactID of the URL to resolve
     */
    contactPhotoURL(contactID: string): string;
    getResourceMode(): Promise<ResourceMode>;
    chats: IMChatClient;
    attachments: IMAttachmentClient;
    contacts: IMContactClient;
    messages: IMMessageClient;
    handles: IMHandleClient;
}
//# sourceMappingURL=client.d.ts.map