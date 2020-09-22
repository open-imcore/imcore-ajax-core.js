import { BulkContactRepresentation, ContactRepresentation } from "../types";
import { ContactSearchParameters } from "../types/search";
import { bulkSearchContacts, contact, contacts, searchContacts } from "./endpoints";
import { ReliantHTTPClient, SearchClient } from "./_client-core";

export class IMContactClient extends ReliantHTTPClient {
    public search = new SearchClient<ContactSearchParameters, ContactRepresentation>(this.client).using(searchContacts, bulkSearchContacts);

    /**
     * Get a contact with the given ID
     * @param contactID ID to resolve
     */
    public async fetchOne(contactID: string): Promise<ContactRepresentation> {
        const { data: contactRepresentation } = await this.get(contact(contactID));

        return contactRepresentation;
    }

    /**
     * Gets all contacts
     */
    public async fetchAll(): Promise<BulkContactRepresentation> {
        const { data: results } = await this.get(contacts);

        return results;
    }
}