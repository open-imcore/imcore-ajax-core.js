import { EventType } from "../websocket/events";
import { Event } from "../websocket/client";

export enum TraceType {
    rest = "rest",
    ws = "ws"
}

export interface TraceData<Type extends TraceType> {
    type: Type;
    timestamp: number;
}

export interface RestTraceData extends TraceData<TraceType.rest> {
    route: string;
    method: string;
    response?: {
        status: number;
        body?: any;
    };
    body?: any;
}

export interface WSTraceData extends TraceData<TraceType.ws> {
    payload: Event<EventType>;
    fromServer: boolean;
    fromMe: boolean;
}

export type AnyTraceData = RestTraceData | WSTraceData;
