/// <reference types="node" />
import { Events, EventType } from "./events";
import { EventEmitter } from "events";
export interface Event<T extends EventType> {
    type: T;
    data: Events[T];
}
export declare function isEvent(e: any): e is Event<EventType>;
export declare interface IMWebSocketClient {
    on<T extends EventType>(event: T, listener: (data: Events[T]) => void): this;
    on(event: string, listener: Function): this;
}
export declare class IMWebSocketClient extends EventEmitter {
    readonly url: string;
    private socket;
    private decoder;
    readonly reconnectInterval = 5000;
    constructor(url: string);
    connect(preload?: string): void;
    private scheduleReconnect;
    private parse;
}
//# sourceMappingURL=client.d.ts.map