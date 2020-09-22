import { HandleRepresentation } from "./handle";

export interface ContactRepresentation {
    id: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    fullName?: string;
    nickname?: string;
    countryCode?: string;
    hasPicture: boolean;
    handles: HandleRepresentation[];
}

export interface ContactIDRepresentation {
    id: string;
}

export interface BulkContactRepresentation {
    contacts: ContactRepresentation[];
    strangers: HandleRepresentation[];
}
