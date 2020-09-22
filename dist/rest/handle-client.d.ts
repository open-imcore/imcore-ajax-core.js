import { ReliantHTTPClient } from "./_client-core";
export declare class IMHandleClient extends ReliantHTTPClient {
    /**
     * Removes a handle ID from the blocklist, returning the updated blocklist
     * @param handle handle ID to unblock
     */
    unblock(handle: string): Promise<string[]>;
    /**
     * Adds a handle ID to the blocklist, returning the updated blocklist
     * @param handle handle to block
     */
    block(handle: string): Promise<string[]>;
    /**
     * Gets an array of blocked handle IDs
     */
    fetchBlocked(): Promise<string[]>;
}
//# sourceMappingURL=handle-client.d.ts.map