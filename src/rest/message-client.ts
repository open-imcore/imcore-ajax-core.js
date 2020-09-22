import { MessageRepresentation } from "../types";
import { MessageSearchParameters } from "../types/search";
import { associatedMessages, bulkSearchMessages, message, messages, searchMessages } from "./endpoints";
import { ReliantHTTPClient, SearchClient } from "./_client-core";

export interface MessageDeletionOptions {
    id: string;
    parts: number[];
}

export class IMMessageClient extends ReliantHTTPClient {
    public search = new SearchClient<MessageSearchParameters, MessageRepresentation>(this.client).using(searchMessages, bulkSearchMessages);

    /**
     * Send an associated message for a given item
     * @param itemID id of the item to associate
     * @param messageID id of the message containing the item
     * @param type association type
     */
    public async createAssociatedMessage(itemID: string, messageID: string, type: number): Promise<MessageRepresentation> {
        const { data: message } = await this.post(associatedMessages, {
            type,
            message: messageID,
            item: itemID
        });

        return message
    }

    /**
     * Gets all associated messages for a given item ID
     * @param id item ID to query
     */
    public async fetchAssociatedMessages(id: string): Promise<MessageRepresentation[]> {
        const { data: { messages } } = await this.get(associatedMessages, {
            params: {
                item: id
            }
        });

        return messages;
    }

    /**
     * Loads a message record from the API
     * @param id message ID
     */
    public async fetchOne(id: string): Promise<MessageRepresentation> {
        const { data: messageRepresentation } = await this.get(message(id));

        return messageRepresentation;
    }

    /**
     * Loads a set of message IDs from the API
     * @param ids message IDs to load
     */
    public async fetchMany(ids: string[]): Promise<MessageRepresentation[]> {
        if (ids.length === 0) return [];

        const { data: { messages: representations } } = await this.get(messages, {
            params: {
                ids: ids.join(",")
            }
        });

        return representations;
    }

    /**
     * Deletes a variable number of messages. If no parts are specified, the entire message is deleted.
     * @param options messages to delete
     */
    public async deleteMessage(options: MessageDeletionOptions[]): Promise<void> {
        await this.delete(messages, {
            messages: options
        });
    }
}