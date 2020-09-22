import { ChatConfigurationRepresentation, ChatPropertyListRepresentation, ChatRepresentation, MessageRepresentation, MessagesExtension } from "../types";
import { ChatSearchParameters } from "../types/search";
import { bulkSearchChats, chat, chatJoin, chatMessages, chatName, chatParticipants, chatPluginMessage, chatProperties, chatRead, chats, chatTyping, searchChats } from "./endpoints";
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

if (typeof window !== "object" || typeof window.Blob === "undefined") {
    var Blob: typeof globalThis.Blob = require('blob').default;
}

export class IMChatClient extends ReliantHTTPClient {
    public search = new SearchClient<ChatSearchParameters, ChatRepresentation>(this.client).using(searchChats, bulkSearchChats);
    
    /**
     * Sends a plugin message to a given chat, returning the created message records
     * @param chatID chatID of the chat to send a message in
     * @param options plugin construction options
     */
    public async sendPluginMessage(chatID: string, options: PluginMessageOptions): Promise<MessageRepresentation[]> {
        const { data: { messages } } = await this.post(chatPluginMessage(chatID), options);

        return messages;
    }

    /**
     * Sends a message to a given chat, returning the created message records from the request
     * @param chatID chatID of the chat to send a message in
     * @param options options to use when crafting the message
     */
    public async sendMessage(chatID: string, options: MessageOptions): Promise<MessageRepresentation[]> {
        options.parts = await Promise.all(options.parts.map(async part => {
            switch (part.type) {
                case "text":
                    return part;
                case "attachment":
                    switch (part.details.substring(0, 4)) {
                        case "data":
                            // base64 string
                            if (typeof window?.atob === 'undefined') {
                                var atob: typeof window.atob = require('atob');
                            }

                            const mime = part.details.substring("data:".length, part.details.indexOf(";base64"));
                            const byteCharacters = atob!(part.details.substring(part.details.indexOf(",") + 1));
                            const byteArrays = [];

                            for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                                const slice = byteCharacters.slice(offset, offset + 512);
                                const byteNumbers: number[] = new Array(slice.length);

                                for (let i = 0; i < slice.length; i++) {
                                    byteNumbers[i] = slice.charCodeAt(i);
                                }

                                byteArrays.push(new Uint8Array(byteNumbers));
                            }

                            part.details = await this.client.attachments.create(new Blob(byteArrays, { type: mime }), mime).then(({ id }) => id);

                            return part;
                        case "http":
                            // url
                            const file = await this.axios({
                                url: part.details,
                                method: "GET",
                                responseType: "blob"
                            });

                            part.details = await this.client.attachments.create(file.data, file.data.type).then(({ id }) => id);

                            return part;
                        default:
                            // ID
                            return part;
                    }
            }
        }));

        const { data: { messages } } = await this.post(chatMessages(chatID), options);

        return messages;
    }

    /**
     * Gets an array of messages for a chat with the given criteria
     * @param chatID chatID of the chat to query messages from
     * @param params parameters to apply when querying for messages
     */
    public async fetchRecentMessages(chatID: string, params: { before?: string, limit?: number }): Promise<MessageRepresentation[]> {
        const { data: { messages } } = await this.get(chatMessages(chatID), {
            params
        }) as { data: { messages: MessageRepresentation[] } }

        return messages;
    }

    /**
     * Gets chat records from the API, starting with the most recent.
     * @param limit max number of chats to retrieve
     */
    public async fetchAll(limit?: number): Promise<ChatRepresentation[]> {
        const { data: { chatRepresentations } } = await this.get(chats, {
            params: {
                limit
            }
        });

        return chatRepresentations;
    }

    /**
     * Deletes a chat record from the API, returning the deleted chat
     *
     * @param chatID the group ID of the chat to delete
     */
    public async deleteChat(chatID: string): Promise<ChatRepresentation> {
        const { data: chatRepresentation } = await this.delete(chat(chatID));

        return chatRepresentation;
    }

    /**
     * Inserts a chat record and returns it
     * @param options chat to create
     */
    public async create(options: ChatCreationOptions): Promise<ChatRepresentation> {
        const { data: chatRepresentation } = await this.post(chats, options);

        return chatRepresentation;
    }

    /**
     * Renames a chat record, returning the updated chat
     * @param chatID chatID of the chat to update
     * @param name new name for the chat
     */
    public async rename(chatID: string, name: string | null): Promise<ChatRepresentation> {
        const { data: chatRepresentation } = await this.patch(chatName(chatID), { name });

        return chatRepresentation;
    }

    /**
     * Sets whether or not the user is composing
     * @param chatID
     * @param isTyping
     */
    public async setTyping(chatID: string, isTyping: boolean): Promise<void> {
        await this[isTyping ? "post" : "delete"](chatTyping(chatID));
    }

    /**
     * Gets a chat record from the API
     * @param chatID chatID of the chat to retrieve
     */
    public async fetchOne(chatID: string): Promise<ChatRepresentation> {
        if (!chatID) {
            console.warn(new Error("ChatID was not provided"));
        }

        const { data: chatRepresentation } = await this.get(chat(chatID));

        return chatRepresentation;
    }

    /**
     * Marks all messages as read in a chat
     * @param chatID chatID of the chat to mark as read
     */
    public async readAllMessages(chatID: string): Promise<void> {
        await this.post(chatRead(chatID));
    }

    /**
     * Gets the latest properties for a chat
     * @param chatID chatID of the chat to query
     */
    public async fetchProperties(chatID: string): Promise<ChatConfigurationRepresentation> {
        const { data: properties } = await this.get(chatProperties(chatID));

        return properties;
    }

    /**
     * Edits the properties of a given chat
     * @param chatID chatID of the chat to mutate
     * @param properties properties to apply
     */
    public async patchProperties(chatID: string, properties: Partial<ChatPropertyListRepresentation>): Promise<ChatConfigurationRepresentation> {
        const { data: newProperties } = await this.patch(chatProperties(chatID), properties);

        return newProperties;
    }

    /**
     * Re-join a group chat, returning the updated chat
     * @param chatID chatID of the chat to re-join
     */
    public async join(chatID: string): Promise<ChatRepresentation> {
        const { data: chatRepresentation } = await this.get(chatJoin(chatID));

        return chatRepresentation;
    }

    /**
     * Returns an array of handle IDs for a given chat record
     * @param chatID chatID of the chat record to query
     */
    public async fetchParticipants(chatID: string): Promise<string[]> {
        const { data: handles } = await this.get(chatParticipants(chatID));

        return handles;
    }

    /**
     * Adds an array of handle IDs to a chat record, returning the updated array of participants
     * @param chatID chatID of the chat to add participants to
     * @param participants participants to add to the chat
     */
    public async addParticipants(chatID: string, participants: string[]): Promise<string[]> {
        const { data: { handles } } = await this.put(chatParticipants(chatID), {
            handles: participants
        });

        return handles;
    }

    /**
     * Removes an array of handle IDs from a chat record, returning the updated array of participants
     * @param chatID chatID of the chat to remove participants from
     * @param participants participants to remove
     */
    public async removeParticipants(chatID: string, participants: string[]): Promise<string[]> {
        const { data: { handles } } = await this.delete(chatParticipants(chatID), {
            handles: participants
        });

        return handles;
    }
}
