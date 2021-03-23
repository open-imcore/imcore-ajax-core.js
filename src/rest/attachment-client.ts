import { AttachmentRepresentation } from "../types";
import { AttachmentSearchParameters } from "../types/search";
import { attachments, bulkSearchAttachments, searchAttachments } from "./endpoints";
import { ReliantHTTPClient, SearchClient } from "./_client-core";

export interface AttachmentCreationOptions {
    mime?: string;
    filename?: string;
}

export class IMAttachmentClient extends ReliantHTTPClient {
    public search = new SearchClient<AttachmentSearchParameters, AttachmentRepresentation>(this.client).using(searchAttachments, bulkSearchAttachments);

    /**
     * Upload a file to the API
     * @param attachment file data
     */
    public async create(attachment: Blob | Buffer | Uint8Array | ArrayBuffer, { mime, filename }: AttachmentCreationOptions): Promise<AttachmentRepresentation> {
        const { data: attachmentRepresentation } = await this.axios.post(`${this.baseURL}${attachments}`, attachment, {
            headers: {
                'content-type': mime || "application/octet-stream"
            },
            params: {
                filename
            }
        });

        return attachmentRepresentation;
    }
}