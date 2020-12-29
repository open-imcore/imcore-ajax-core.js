import { ChatIDRepresentation, ChatRepresentation, ContactRepresentation, ContactIDRepresentation, BulkHandleIDRepresentation, BulkMessageIDRepresentation, BulkChatItemRepresentation, BulkContactRepresentation, StatusChatItemRepresentation, ChatConfigurationRepresentation, MessageRepresentation } from '../types';
export declare enum EventType {
    bootstrap = "bootstrap",
    itemsReceived = "itemsReceived",
    itemsUpdated = "itemsUpdated",
    itemStatusChanged = "itemStatusChanged",
    itemsRemoved = "itemsRemoved",
    participantsChanged = "participantsChanged",
    conversationRemoved = "conversationRemoved",
    conversationCreated = "conversationCreated",
    conversationChanged = "conversationChanged",
    conversationDisplayNameChanged = "conversationDisplayNameChanged",
    conversationJoinStateChanged = "conversationJoinStateChanged",
    conversationUnreadCountChanged = "conversationUnreadCountChanged",
    conversationPropertiesChanged = "conversationPropertiesChanged",
    contactCreated = "contactCreated",
    contactRemoved = "contactRemoved",
    contactUpdated = "contactUpdated",
    blockListUpdated = "blockListUpdated"
}
export interface BootstrapEvent {
    chats: ChatRepresentation[];
    contacts: BulkContactRepresentation;
    messages?: MessageRepresentation[];
}
export declare type ItemsReceivedEvent = BulkChatItemRepresentation;
export declare type ItemsUpdatedEvent = BulkChatItemRepresentation;
export declare type ItemStatusChangedEvent = StatusChatItemRepresentation;
export declare type ItemsRemovedEvent = BulkMessageIDRepresentation;
export interface ParticipantsChangedEvent extends BulkHandleIDRepresentation {
    chat: string;
}
export declare type ConversationRemovedEvent = ChatIDRepresentation;
export declare type ConversationChangedEvent = ChatRepresentation;
export declare type ConversationDisplayNameChangedEvent = ChatRepresentation;
export declare type ConversationJoinStateChangedEvent = ChatRepresentation;
export declare type ConversationCreatedEvent = ChatRepresentation;
export declare type ConversationUnreadCountChangedEvent = ChatRepresentation;
export declare type ConversationPropertiesChangedEvent = ChatConfigurationRepresentation;
export declare type ContactCreatedEvent = ContactRepresentation;
export declare type ContactUpdatedEvent = ContactRepresentation;
export declare type ContactRemovedEvent = ContactIDRepresentation;
export declare type BlockListUpdatedEvent = BulkHandleIDRepresentation;
export declare type Events = {
    [EventType.bootstrap]: BootstrapEvent;
    [EventType.itemsReceived]: ItemsReceivedEvent;
    [EventType.itemsUpdated]: ItemsUpdatedEvent;
    [EventType.itemStatusChanged]: ItemStatusChangedEvent;
    [EventType.itemsRemoved]: ItemsRemovedEvent;
    [EventType.participantsChanged]: ParticipantsChangedEvent;
    [EventType.conversationRemoved]: ConversationRemovedEvent;
    [EventType.conversationChanged]: ConversationChangedEvent;
    [EventType.conversationDisplayNameChanged]: ConversationDisplayNameChangedEvent;
    [EventType.conversationJoinStateChanged]: ConversationJoinStateChangedEvent;
    [EventType.conversationUnreadCountChanged]: ConversationUnreadCountChangedEvent;
    [EventType.conversationPropertiesChanged]: ConversationPropertiesChangedEvent;
    [EventType.conversationCreated]: ConversationCreatedEvent;
    [EventType.contactCreated]: ContactCreatedEvent;
    [EventType.contactRemoved]: ContactRemovedEvent;
    [EventType.contactUpdated]: ContactUpdatedEvent;
    [EventType.blockListUpdated]: BlockListUpdatedEvent;
};
//# sourceMappingURL=events.d.ts.map