import { inspect } from "util";
import { EventType, IMHTTPClient, IMWebSocketClient } from "../src";

const http = new IMHTTPClient({
    baseURL: "http://localhost:8091"
})

http.security.token("Pebbles1029!").then(token => {
    const stream = new IMWebSocketClient("ws://127.0.0.1:8091/stream", token);

    Object.values(EventType).forEach(event => {
        stream.on(event, data => {
            console.log(`ayy we got the ${event}`);
            console.log(inspect(data, undefined, 2, true));
        });
    });

    stream.on(EventType.bootstrap, data => {
        console.log("ayy we got the strap");
    });

    stream.on("debug", ({ level, message }: { level: keyof Console, message: string[] }) => (console)[level](...message));

    stream.connect();
})