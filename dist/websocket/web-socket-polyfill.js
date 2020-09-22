"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (typeof window !== "undefined") {
    exports.WebSocket = window.WebSocket;
    exports.TextDecoder = window.TextDecoder;
}
else {
    exports.WebSocket = require('ws');
    exports.TextDecoder = require('util').TextDecoder;
}
//# sourceMappingURL=web-socket-polyfill.js.map