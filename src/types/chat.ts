import { IMService } from "../Constants";

export interface ChatPropertyListRepresentation {
    readReceipts: boolean;
    ignoreAlerts: boolean;
}

export interface ChatConfigurationRepresentation extends ChatPropertyListRepresentation {
    id: string;
}

export interface ChatConfigurationRepresentation extends ChatPropertyListRepresentation {
    id: string;
}

export interface ChatRepresentation extends ChatConfigurationRepresentation {
    joinState: number;
    roomName?: string;
    displayName?: string;
    id: string;
    participants: string[];
    unreadMessageCount?: number;
    messageFailureCount?: number;
    service: IMService;
    lastMessage?: string;
    lastMessageTime: number;
    style: number;
    groupPhotoID?: string | null;
}

export interface ChatIDRepresentation {
    chat: string;
}

export interface BulkChatRepresentation {
    chats: ChatRepresentation[];
}
