export const resource = (identifier: string) => `/resources/${identifier}`;

/** Attachments */
export const attachments = "/attachments"

    /** Specific Attachment */
    export const attachment = (attachmentID: string) => `${attachments}/${attachmentID}`

/** Messages */
export const messages = "/messages"

    /** Tapback */
    export const associatedMessages = `${messages}/associated`

    /** Specific Message */
    export const message = (messageID: string) => `${messages}/${messageID}`

/** Chats */
export const chats = "/chats"
export const chat = (chatID: string) => `${chats}/${chatID}`

    /** Specific Chat */
    export const chatTyping = (chatID: string) => `${chat(chatID)}/typing`;
    export const chatRead = (chatID: string) => `${chat(chatID)}/read`;
    export const chatJoin = (chatID: string) => `${chat(chatID)}/join`
    export const chatProperties = (chatID: string) => `${chat(chatID)}/properties`;
    export const chatName = (chatID: string) => `${chat(chatID)}/name`
    export const chatParticipants = (chatID: string) => `${chat(chatID)}/participants`

        /** Chat Messages */
        export const chatMessages = (chatID: string) => `${chat(chatID)}/messages`
        export const chatPluginMessage = (chatID: string) => `${chatMessages(chatID)}/plugin`

    /** Chat Bulk Messages */
    export const bulkChatMessage = `${chats}/bulk/message`;
    export const bulkChatPluginMessage = `${chats}/bulk/plugin`;

/** Handles */
export const handles = "/handles"
export const handleBlocks = `${handles}/blocked`
export const handleBlock = (handleID: string) => `${handleBlocks}/${handleID}`

/** Contacts */
export const contacts = "/contacts"
export const contact = (contactID: string) => `${contacts}/${contactID}`
export const contactPhoto = (contactID: string) => `${contact(contactID)}/photo`

/** Search */
export const searchChats = `${chats}/search`
export const searchAttachments = `${attachments}/search`
export const searchMessages = `${messages}/search`
export const searchContacts = `${contacts}/search`

    /** Bulk Search */
    export const bulkSearchChats = `${searchChats}/bulk`
    export const bulkSearchAttachments = `${searchAttachments}/bulk`
    export const bulkSearchMessages = `${searchMessages}/bulk`
    export const bulkSearchContacts = `${searchContacts}/bulk`

/** Security */
export const security = `/security`
export const securityAttachmentsSession = `${security}/attachment-session`
export const securityToken = `${security}/token`
export const securityBotToken = `${security}/bot-token`
export const securityPSK = `${security}/psk`