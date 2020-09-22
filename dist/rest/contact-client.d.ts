import { BulkContactRepresentation, ContactRepresentation } from "../types";
import { ContactSearchParameters } from "../types/search";
import { ReliantHTTPClient, SearchClient } from "./_client-core";
export declare class IMContactClient extends ReliantHTTPClient {
    search: SearchClient<ContactSearchParameters, ContactRepresentation>;
    /**
     * Get a contact with the given ID
     * @param contactID ID to resolve
     */
    fetchOne(contactID: string): Promise<ContactRepresentation>;
    /**
     * Gets all contacts
     */
    fetchAll(): Promise<BulkContactRepresentation>;
}
//# sourceMappingURL=contact-client.d.ts.map