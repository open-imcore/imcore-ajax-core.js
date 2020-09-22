import { inspect } from "util";
import { EventType, IMWebSocketClient } from "../src";

const stream = new IMWebSocketClient("ws://127.0.0.1:8090/stream");

stream.connect();

Object.values(EventType).forEach(event => {
    stream.on(event, data => {
        console.log(`ayy we got the ${event}`);
        console.log(inspect(data, undefined, 2, true));
    });
});

stream.on(EventType.bootstrap, data => {
    console.log("ayy we got the strap");
});