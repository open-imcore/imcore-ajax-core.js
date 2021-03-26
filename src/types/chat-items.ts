import { ChatItemType } from "../Constants";
import { IMService } from "../Constants";
import { AttachmentChatItemRepresentation, AttachmentRepresentation } from "./attachment";
import { DigitalTouch } from "./digital-touch";
import { MessagesExtension } from "./message-extension";
import { RichLink } from "./rich-link";

export interface BulkChatItemRepresentation {
    items: AnyChatItemModel[];
}

export interface ChatItemRepresentation {
    id: string;
    chatID: string;
    fromMe: boolean;
    time: number;
    threadIdentifier?: string;
    threadOriginator?: string;
}

export interface AssociatedChatItemRepresentation extends ChatItemRepresentation {
    associatedID: string;
}

export type DateTranscriptChatItemRepresentation = ChatItemRepresentation;

export interface SenderTranscriptChatItemRepresentation extends ChatItemRepresentation {
    handleID: string;
}

export interface ParticipantChangeTranscriptChatItemRepresentation extends ChatItemRepresentation {
    initiatorID?: string;
    targetID?: string;
    changeType: number;
}

export interface StatusChatItemRepresentation extends ChatItemRepresentation {
    statusType: number;
    itemID: string;
    flags: number;
    timeDelivered: number;
    timeRead: number;
    timePlayed: number;
}

export interface GroupActionTranscriptChatItemRepresentation extends ChatItemRepresentation {
    actionType: number;
    sender: string;
}

export interface PluginChatItemRepresentation extends ChatItemAcknowledgableRepresentation {
    richLink?: RichLink;
    extension?: MessagesExtension;
    digitalTouch?: DigitalTouch;
    payload?: string;
    bundleID: string;
    attachments: AttachmentRepresentation[];
}

export enum TextPartType {
  link = "link",
  calendar = "calendar",
  text = "text"
}

export enum TextPartAttributeType {
    bold = "bold",
    italic = "italic",
    underline = "underline",
    strike = "strike",
    writingDirection = "writingDirection",
    link = "link",
    breadcrumbMarker = "breadcrumbMarker",
    breadcrumbOptions = "breadcrumbOptions",
    mention = "mention"
}

export interface TextPartAttributeMapping {
    [TextPartAttributeType.bold]: number;
    [TextPartAttributeType.italic]: number;
    [TextPartAttributeType.underline]: number;
    [TextPartAttributeType.strike]: number;
    [TextPartAttributeType.writingDirection]: number;
    [TextPartAttributeType.link]: string;
    [TextPartAttributeType.breadcrumbMarker]: string;
    [TextPartAttributeType.breadcrumbOptions]: number;
    [TextPartAttributeType.mention]: string;
}

export type TextPartAttribute<T extends TextPartAttributeType> = {
    key: T;
    value: TextPartAttributeMapping[T];
}

type TextPartLedger = {
    [K in TextPartAttributeType]: TextPartAttribute<K>
}

export type AnyTextPartAttribute = TextPartLedger[keyof TextPartLedger];

export interface TextPart {
  type: TextPartType;
  string: string;
  data?: any;
  attributes?: AnyTextPartAttribute[];
}

export interface TextChatItemRepresentation extends ChatItemAcknowledgableRepresentation {
    text: string;
    parts: TextPart[];
    subject?: string | null;
}

export interface ChatItemAcknowledgableRepresentation extends ChatItemRepresentation {
    acknowledgments?: AcknowledgmentChatItemRepresentation[];
}

export enum AcknowledgmentType {
    heart = 2000,
    thumbsup = 2001,
    thumbsdown = 2002,
    ha = 2003,
    exclamation = 2004,
    questionmark = 2005,
    removeHeart = 3000,
    removeThumbsup = 3001,
    removeThumbsdown = 3002,
    removeHa = 3003,
    removeExclamation = 3004,
    removeQuestionmark = 3005
}

export interface AcknowledgmentChatItemRepresentation extends AssociatedChatItemRepresentation {
    sender?: string;
    acknowledgmentType: AcknowledgmentType;
}

export interface AssociatedMessageItemRepresentation extends ChatItemRepresentation {
    associatedID: string;
    associatedType: number;
}

export interface TypingChatItemRepresentation extends ChatItemRepresentation {
  sender: string;
}

export interface FileTransferContainer {
    fileTransferIDs: string[];
}

export interface MessageRepresentation extends ChatItemRepresentation, FileTransferContainer {
    sender?: string;
    subject?: string;
    service: IMService;
    timeDelivered: number;
    timePlayed: number;
    timeRead: number;
    messageSubject?: string;
    isSOS: boolean;
    isTypingMessage: boolean;
    isCancelTypingMessage: boolean;
    isDelivered: boolean;
    isAudioMessage: boolean;
    description?: string;
    flags: number;
    items: AnyChatItemModel[];
    associatedMessageID?: string;
}

export enum ResourceMode {
  SocialUI = "SocialUI",
  ChatKit = "ChatKit",
  Local = "Local"
}

export interface StickerRepresentation {
  stickerID: string;
  stickerPackID: string;
  stickerHash: string;
  stickerRecipe?: string;
  bid?: string;
  transcodedStickerHash?: string;
  layoutIntent: number;
  associatedLayoutIntent: number;
  parentPreviewWidth: number;
  xScalar: number;
  yScalar: number;
  scale: number;
  rotation: number;
  transcodedScale?: number;
}

export interface StickerChatItemRepresentation extends AssociatedChatItemRepresentation {
  attachment?: AttachmentRepresentation;
  sticker?: StickerRepresentation;
}

export interface StubChatItemRepresentation extends ChatItemRepresentation {
    className: string;
}

export interface GroupTitleChangeItemRepresentation extends ChatItemRepresentation {
    title: string;
    sender?: string;
}

export type ChatItems = {
    [ChatItemType.date]: DateTranscriptChatItemRepresentation,
    [ChatItemType.sender]: SenderTranscriptChatItemRepresentation,
    [ChatItemType.participantChange]: ParticipantChangeTranscriptChatItemRepresentation,
    [ChatItemType.attachment]: AttachmentChatItemRepresentation,
    [ChatItemType.status]: StatusChatItemRepresentation,
    [ChatItemType.groupAction]: GroupActionTranscriptChatItemRepresentation,
    [ChatItemType.plugin]: PluginChatItemRepresentation,
    [ChatItemType.text]: TextChatItemRepresentation,
    [ChatItemType.acknowledgment]: AcknowledgmentChatItemRepresentation,
    [ChatItemType.associated]: AssociatedMessageItemRepresentation,
    [ChatItemType.message]: MessageRepresentation,
    [ChatItemType.phantom]: StubChatItemRepresentation,
    [ChatItemType.groupTitle]: GroupTitleChangeItemRepresentation,
    [ChatItemType.typing]: TypingChatItemRepresentation,
    [ChatItemType.sticker]: StickerChatItemRepresentation
}

export interface ChatItem<T extends ChatItemType> {
    type: T;
    payload: ChatItems[T];
}

export type AnyChatItemModel = ChatItem<ChatItemType.sticker> | ChatItem<ChatItemType.typing> | ChatItem<ChatItemType.date> | ChatItem<ChatItemType.sender> | ChatItem<ChatItemType.participantChange> | ChatItem<ChatItemType.attachment> | ChatItem<ChatItemType.status> | ChatItem<ChatItemType.groupAction> | ChatItem<ChatItemType.plugin> | ChatItem<ChatItemType.text> | ChatItem<ChatItemType.acknowledgment> | ChatItem<ChatItemType.associated> | ChatItem<ChatItemType.message> | ChatItem<ChatItemType.phantom> | ChatItem<ChatItemType.groupTitle>
