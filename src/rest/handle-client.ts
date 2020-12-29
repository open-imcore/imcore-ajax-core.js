import { IDSStatus, IDSStatuses } from "../types";
import { handleBlock, handleBlocks, handleIDS } from "./endpoints";
import { ReliantHTTPClient } from "./_client-core";

export class IMHandleClient extends ReliantHTTPClient {
    public async queryIDSForHandles(handles: string[]): Promise<Record<string, IDSStatus[]>> {
        const { statuses } = await this.get(handleIDS, {
            params: {
                handles
            }
        }).then(r => r.data as { statuses: IDSStatuses[] });

        return statuses.reduce((acc, { handle, services }) => (acc[handle] = services, acc), {} as Record<string, IDSStatus[]>);
    }

    /**
     * Removes a handle ID from the blocklist, returning the updated blocklist
     * @param handle handle ID to unblock
     */
    public async unblock(handle: string): Promise<string[]> {
        const { data: { handles } } = await this.delete(handleBlock(handle));

        return handles;
    }

    /**
     * Adds a handle ID to the blocklist, returning the updated blocklist
     * @param handle handle to block
     */
    public async block(handle: string): Promise<string[]> {
        const { data: { handles } } = await this.put(handleBlock(handle));

        return handles;
    }

    /**
     * Gets an array of blocked handle IDs
     */
    public async fetchBlocked(): Promise<string[]> {
        const { data: { handles } } = await this.get(handleBlocks);

        return handles;
    }
}