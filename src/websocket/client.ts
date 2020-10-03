import { WebSocket, TextDecoder } from "./web-socket-polyfill";
import pako from "pako";
import { Events, EventType } from "./events";
import { EventEmitter } from "events";

export interface Event<T extends EventType> {
    type: T;
    data: Events[T];
}

export enum CommandType {
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

export function isEvent(e: any): e is Event<EventType> {
    return typeof e === "object"
        && typeof e.type === "string"
        && typeof e.data === "object";
}

export declare interface IMWebSocketClient {
    on<T extends EventType>(event: T, listener: (data: Events[T]) => void): this;
    on(event: string, listener: Function): this;
}

export class IMWebSocketClient extends EventEmitter {
    private socket: WebSocket;
    private decoder = new TextDecoder("utf-8");
    public readonly reconnectInterval = 5000

    constructor(public readonly url: string, public readonly token?: string | undefined) {
        super();
    }

    connect(preload?: string) {
        const compiled = new URL(this.url);
        if (preload) {
          compiled.searchParams.set("chatPreload", preload);
        }

        this.socket = new WebSocket(compiled.toString());

        this.socket.binaryType = "arraybuffer";

        this.socket.addEventListener('message', message => {
            if (typeof message.data === "string") {
                return this.parse(message.data);
            }

            const uint8 = pako.inflateRaw(new Uint8Array(message.data as ArrayBuffer));

            this.parse(this.decoder.decode(uint8));
        });

        this.socket.addEventListener('error', _ => {

        });

        this.socket.addEventListener('close', event => {
            this.emit('debug', { level: 'log', message: ['Socket closed with event', event] })

            switch (event.code) {
                default:
                    this.scheduleReconnect();
            }
        });

        this.socket.addEventListener('open', () => {
            if (this.token) {
                this.send({
                    type: CommandType.identify,
                    data: {
                        token: this.token
                    }
                })
            }
        });
    }

    private send<T extends CommandType>(command: StreamingCommand<T>) {
        this.sendRaw(JSON.stringify(command));
    }

    private sendRaw(text: string) {
        this.socket.send(text);
    }

    private scheduleReconnect() {
        setTimeout(() => this.connect(), this.reconnectInterval);
    }

    private parse(raw: string) {
        try {
            var payload = JSON.parse(raw);
        } catch (e) {
            this.emit('debug', { level: 'error', message: [e] })
            return
        }

        if (!isEvent(payload)) {
            return
        }

        this.emit(payload.type, payload.data);
    }
}
