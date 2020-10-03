import { ReliantHTTPClient } from "./_client-core";
import { securityAttachmentsSession, securityBotToken, securityPSK, securityToken } from "./endpoints";

/** Grants that can be applied to a token **/
export enum IMTokenGrant {
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

export class IMSecurityClient extends ReliantHTTPClient {
    /**
     * Creates a user token using the psk
     * @param psk pre-defined psk
     * @param updateStoredToken whether to set the global token to the result
     */
    async token(psk: string, updateStoredToken: boolean = false): Promise<string> {
        const { token } = await this.post(securityToken, {
            psk
        }).then(r => r.data);

        if (updateStoredToken) this.client.token = token;

        return token;
    }

    /**
     * Creates a bot token with the given grants
     * @param grants grants to include in the token
     * @param updateStoredToken whether to set the global token to the result
     */
    async botToken(grants: IMTokenGrant[], updateStoredToken: boolean = false): Promise<string> {
        const { token } = await this.post(securityBotToken, {
            grants
        }).then(r => r.data);

        if (updateStoredToken) this.client.token = token;

        return token;
    }

    /**
     * Opens an attachment session allowing <img> tags to load
     */
    async attachmentSession() {
        await this.get(securityAttachmentsSession);
    }

    /**
     * Changes the PSK. The old PSK can be omitted if there is no pre-defined PSK.
     * @param options old and new PSK
     * @param updateStoredToken whether to set the global token to the result
     */
    async changePSK(options: PSKChangeRequest, updateStoredToken: boolean = false): Promise<string> {
        const { token } = await this.patch(securityPSK, options).then(r => r.data);

        if (updateStoredToken) this.client.token = token;

        return token;
    }
}