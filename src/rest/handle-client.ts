import { handleBlock, handleBlocks } from "./endpoints";
import { ReliantHTTPClient } from "./_client-core";

export class IMHandleClient extends ReliantHTTPClient {
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