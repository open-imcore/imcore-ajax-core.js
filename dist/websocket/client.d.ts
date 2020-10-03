/// <reference types="node" />
import { Events, EventType } from "./events";
import { EventEmitter } from "events";
export interface Event<T extends EventType> {
    type: T;
    data: Events[T];
}
export declare enum CommandType {
    identify = "identify"
}
export interface Commands {
    [CommandType.identify]: IdentifyPayload;
}
export interface IdentifyPayload {
    token: string;
}
export interface StreamingCommand<T extends CommandType> {
    type: T;
    data: Commands[T];
}
export declare function isEvent(e: any): e is Event<EventType>;
export declare interface IMWebSocketClient {
    on<T extends EventType>(event: T, listener: (data: Events[T]) => void): this;
    on(event: string, listener: Function): this;
}
export declare class IMWebSocketClient extends EventEmitter {
    readonly url: string;
    readonly token?: string | undefined;
    private socket;
    private decoder;
    readonly reconnectInterval = 5000;
    constructor(url: string, token?: string | undefined);
    connect(preload?: string): void;
    private send;
    private sendRaw;
    private scheduleReconnect;
    private parse;
}
//# sourceMappingURL=client.d.ts.map