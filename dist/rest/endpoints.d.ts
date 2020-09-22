export declare const resource: (identifier: string) => string;
/** Attachments */
export declare const attachments = "/attachments";
/** Specific Attachment */
export declare const attachment: (attachmentID: string) => string;
/** Messages */
export declare const messages = "/messages";
/** Tapback */
export declare const associatedMessages: string;
/** Specific Message */
export declare const message: (messageID: string) => string;
/** Chats */
export declare const chats = "/chats";
export declare const chat: (chatID: string) => string;
/** Specific Chat */
export declare const chatTyping: (chatID: string) => string;
export declare const chatRead: (chatID: string) => string;
export declare const chatJoin: (chatID: string) => string;
export declare const chatProperties: (chatID: string) => string;
export declare const chatName: (chatID: string) => string;
export declare const chatParticipants: (chatID: string) => string;
/** Chat Messages */
export declare const chatMessages: (chatID: string) => string;
export declare const chatPluginMessage: (chatID: string) => string;
/** Chat Bulk Messages */
export declare const bulkChatMessage: string;
export declare const bulkChatPluginMessage: string;
/** Handles */
export declare const handles = "/handles";
export declare const handleBlocks: string;
export declare const handleBlock: (handleID: string) => string;
/** Contacts */
export declare const contacts = "/contacts";
export declare const contact: (contactID: string) => string;
export declare const contactPhoto: (contactID: string) => string;
/** Search */
export declare const searchChats: string;
export declare const searchAttachments: string;
export declare const searchMessages: string;
export declare const searchContacts: string;
/** Bulk Search */
export declare const bulkSearchChats: string;
export declare const bulkSearchAttachments: string;
export declare const bulkSearchMessages: string;
export declare const bulkSearchContacts: string;
//# sourceMappingURL=endpoints.d.ts.map