import { ChatConfigurationRepresentation, ChatPropertyListRepresentation, ChatRepresentation, MessageRepresentation, MessagesExtension } from "../types";
import { ChatSearchParameters } from "../types/search";
import { ReliantHTTPClient, SearchClient } from "./_client-core";
export interface MessagePartOptions {
    type: "text" | "attachment";
    details: string;
}
export interface MessageOptions {
    subject?: string;
    parts: MessagePartOptions[];
    isAudioMessage?: boolean;
    flags?: number;
    balloonBundleID?: string;
    payloadData?: string;
    expressiveSendStyleID?: string;
}
export interface PluginMessageOptions {
    extensionData: MessagesExtension;
    attachmentID?: string;
    bundleID: string;
    expressiveSendStyleID: string;
}
export interface ChatCreationOptions {
    participants: string[];
}
export declare class IMChatClient extends ReliantHTTPClient {
    search: SearchClient<ChatSearchParameters, ChatRepresentation>;
    /**
     * Sends a plugin message to a given chat, returning the created message records
     * @param chatID chatID of the chat to send a message in
     * @param options plugin construction options
     */
    sendPluginMessage(chatID: string, options: PluginMessageOptions): Promise<MessageRepresentation[]>;
    /**
     * Sends a message to a given chat, returning the created message records from the request
     * @param chatID chatID of the chat to send a message in
     * @param options options to use when crafting the message
     */
    sendMessage(chatID: string, options: MessageOptions): Promise<MessageRepresentation[]>;
    /**
     * Gets an array of messages for a chat with the given criteria
     * @param chatID chatID of the chat to query messages from
     * @param params parameters to apply when querying for messages
     */
    fetchRecentMessages(chatID: string, params: {
        before?: string;
        limit?: number;
    }): Promise<MessageRepresentation[]>;
    /**
     * Gets chat records from the API, starting with the most recent.
     * @param limit max number of chats to retrieve
     */
    fetchAll(limit?: number): Promise<ChatRepresentation[]>;
    /**
     * Deletes a chat record from the API, returning the deleted chat
     *
     * @param chatID the group ID of the chat to delete
     */
    deleteChat(chatID: string): Promise<ChatRepresentation>;
    /**
     * Inserts a chat record and returns it
     * @param options chat to create
     */
    create(options: ChatCreationOptions): Promise<ChatRepresentation>;
    /**
     * Renames a chat record, returning the updated chat
     * @param chatID chatID of the chat to update
     * @param name new name for the chat
     */
    rename(chatID: string, name: string | null): Promise<ChatRepresentation>;
    /**
     * Sets whether or not the user is composing
     * @param chatID
     * @param isTyping
     */
    setTyping(chatID: string, isTyping: boolean): Promise<void>;
    /**
     * Gets a chat record from the API
     * @param chatID chatID of the chat to retrieve
     */
    fetchOne(chatID: string): Promise<ChatRepresentation>;
    /**
     * Marks all messages as read in a chat
     * @param chatID chatID of the chat to mark as read
     */
    readAllMessages(chatID: string): Promise<void>;
    /**
     * Gets the latest properties for a chat
     * @param chatID chatID of the chat to query
     */
    fetchProperties(chatID: string): Promise<ChatConfigurationRepresentation>;
    /**
     * Edits the properties of a given chat
     * @param chatID chatID of the chat to mutate
     * @param properties properties to apply
     */
    patchProperties(chatID: string, properties: Partial<ChatPropertyListRepresentation>): Promise<ChatConfigurationRepresentation>;
    /**
     * Re-join a group chat, returning the updated chat
     * @param chatID chatID of the chat to re-join
     */
    join(chatID: string): Promise<ChatRepresentation>;
    /**
     * Returns an array of handle IDs for a given chat record
     * @param chatID chatID of the chat record to query
     */
    fetchParticipants(chatID: string): Promise<string[]>;
    /**
     * Adds an array of handle IDs to a chat record, returning the updated array of participants
     * @param chatID chatID of the chat to add participants to
     * @param participants participants to add to the chat
     */
    addParticipants(chatID: string, participants: string[]): Promise<string[]>;
    /**
     * Removes an array of handle IDs from a chat record, returning the updated array of participants
     * @param chatID chatID of the chat to remove participants from
     * @param participants participants to remove
     */
    removeParticipants(chatID: string, participants: string[]): Promise<string[]>;
}
//# sourceMappingURL=chat-client.d.ts.map