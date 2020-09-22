import { IMService } from "../Constants";

export interface SearchParameters {
    limit?: number;
    page?: number;
}

export interface BulkSearchRequest<Params> {
    [key: string]: Params;
}

export interface SearchResult<Object> {
    results: Object[];
}

export type BulkSearchResult<Object, Source> = {
    [key in keyof Source]: Object[];
}

export interface ChatSearchParameters extends SearchParameters {
    identifiers?: string[];
    participants?: string[];
    display_name?: string;
    read_receipts?: boolean;
    ignore_alerts?: boolean;
    style?: number;
    join_state?: number;
    services?: IMService[];
    has_unread?: boolean;
    has_failed?: boolean;
    last_message_text?: string;
}

export interface ContactSearchParameters extends SearchParameters {
    ids?: string[];
    first_name?: string;
    last_name?: string;
    nickname?: string;
    has_picture?: boolean;
    handles?: string[];
}

export interface MessageSearchParameters extends SearchParameters {
    search?: string;
    bundle_id?: string;
    chats?: string[];
    handles?: string[];
    contacts?: string[];
    from_me?: boolean;
}

export interface AttachmentSearchParameters extends SearchParameters {
    mime?: string[];
    likeMIME?: string;
    uti?: string[];
    likeUTI?: string;
    name?: string;
    chats?: string[];
}