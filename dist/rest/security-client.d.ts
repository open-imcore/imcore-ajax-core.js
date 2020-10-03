import { ReliantHTTPClient } from "./_client-core";
/** Grants that can be applied to a token **/
export declare enum IMTokenGrant {
    /** The human grant is required to allow new tokens to be generated */
    human = "human",
    /** use the streaming API */
    streaming = "streaming",
    /** use the debugging API */
    debugging = "debugging",
    /** read chat data */
    readChats = "readChats",
    /** modify, create, delete chats*/
    writeChats = "writeChats",
    /** read contacts data */
    readContacts = "readContacts",
    /** modify, create, delete contacts */
    writeContacts = "writeContacts",
    /** read messages data */
    readMessages = "readMessages",
    /** modify, create, delete messages */
    writeMessages = "writeMessages",
    /** read attachments data */
    readAttachments = "readAttachments",
    /** modify, create, delete attachments*/
    writeAttachments = "writeAttachments"
}
export interface PSKChangeRequest {
    oldPSK?: string;
    newPSK: string;
}
export declare class IMSecurityClient extends ReliantHTTPClient {
    /**
     * Creates a user token using the psk
     * @param psk pre-defined psk
     * @param updateStoredToken whether to set the global token to the result
     */
    token(psk: string, updateStoredToken?: boolean): Promise<string>;
    /**
     * Creates a bot token with the given grants
     * @param grants grants to include in the token
     * @param updateStoredToken whether to set the global token to the result
     */
    botToken(grants: IMTokenGrant[], updateStoredToken?: boolean): Promise<string>;
    /**
     * Opens an attachment session allowing <img> tags to load
     */
    attachmentSession(): Promise<void>;
    /**
     * Changes the PSK. The old PSK can be omitted if there is no pre-defined PSK.
     * @param options old and new PSK
     * @param updateStoredToken whether to set the global token to the result
     */
    changePSK(options: PSKChangeRequest, updateStoredToken?: boolean): Promise<string>;
}
//# sourceMappingURL=security-client.d.ts.map