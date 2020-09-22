import { ChatItemAcknowledgableRepresentation } from "./chat-items";

export interface ResourceOrigin {
    chatID?: string;
    handleID?: string;
    date?: number;
}

export interface AttachmentRepresentation {
    mime?: string;
    filename?: string;
    id: string;
    uti?: string;
    origin?: ResourceOrigin;
}

export interface AttachmentChatItemRepresentation extends ChatItemAcknowledgableRepresentation {
    transferID: string;
    metadata?: AttachmentRepresentation;
}
