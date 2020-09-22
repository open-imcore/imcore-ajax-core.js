import { MessageRepresentation } from "../types";
import { MessageSearchParameters } from "../types/search";
import { ReliantHTTPClient, SearchClient } from "./_client-core";
export interface MessageDeletionOptions {
    id: string;
    parts: number[];
}
export declare class IMMessageClient extends ReliantHTTPClient {
    search: SearchClient<MessageSearchParameters, MessageRepresentation>;
    /**
     * Send an associated message for a given item
     * @param itemID id of the item to associate
     * @param messageID id of the message containing the item
     * @param type association type
     */
    createAssociatedMessage(itemID: string, messageID: string, type: number): Promise<MessageRepresentation>;
    /**
     * Gets all associated messages for a given item ID
     * @param id item ID to query
     */
    fetchAssociatedMessages(id: string): Promise<MessageRepresentation[]>;
    /**
     * Loads a message record from the API
     * @param id message ID
     */
    fetchOne(id: string): Promise<MessageRepresentation>;
    /**
     * Loads a set of message IDs from the API
     * @param ids message IDs to load
     */
    fetchMany(ids: string[]): Promise<MessageRepresentation[]>;
    /**
     * Deletes a variable number of messages. If no parts are specified, the entire message is deleted.
     * @param options messages to delete
     */
    deleteMessage(options: MessageDeletionOptions[]): Promise<void>;
}
//# sourceMappingURL=message-client.d.ts.map