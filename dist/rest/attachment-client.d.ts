/// <reference types="node" />
import { AttachmentRepresentation } from "../types";
import { AttachmentSearchParameters } from "../types/search";
import { ReliantHTTPClient, SearchClient } from "./_client-core";
export declare class IMAttachmentClient extends ReliantHTTPClient {
    search: SearchClient<AttachmentSearchParameters, AttachmentRepresentation>;
    /**
     * Upload a file to the API
     * @param attachment file data
     */
    create(attachment: Blob | Buffer | Uint8Array | ArrayBuffer, mime?: string): Promise<AttachmentRepresentation>;
}
//# sourceMappingURL=attachment-client.d.ts.map