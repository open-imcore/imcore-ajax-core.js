"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMWebSocketClient = exports.isEvent = exports.CommandType = void 0;
var web_socket_polyfill_1 = require("./web-socket-polyfill");
var pako_1 = __importDefault(require("pako"));
var events_1 = require("events");
var CommandType;
(function (CommandType) {
    CommandType["identify"] = "identify";
})(CommandType = exports.CommandType || (exports.CommandType = {}));
function isEvent(e) {
    return typeof e === "object"
        && typeof e.type === "string"
        && typeof e.data === "object";
}
exports.isEvent = isEvent;
var IMWebSocketClient = /** @class */ (function (_super) {
    __extends(IMWebSocketClient, _super);
    function IMWebSocketClient(url, token) {
        var _this = _super.call(this) || this;
        _this.url = url;
        _this.token = token;
        _this.decoder = new web_socket_polyfill_1.TextDecoder("utf-8");
        _this.reconnectInterval = 5000;
        return _this;
    }
    IMWebSocketClient.prototype.connect = function (preload) {
        var _this = this;
        var compiled = new URL(this.url);
        if (preload) {
            compiled.searchParams.set("chatPreload", preload);
        }
        this.socket = new web_socket_polyfill_1.WebSocket(compiled.toString());
        this.socket.binaryType = "arraybuffer";
        this.socket.addEventListener('message', function (message) {
            if (typeof message.data === "string") {
                return _this.parse(message.data);
            }
            var uint8 = pako_1.default.inflateRaw(new Uint8Array(message.data));
            _this.parse(_this.decoder.decode(uint8));
        });
        this.socket.addEventListener('error', function (_) {
        });
        this.socket.addEventListener('close', function (event) {
            _this.emit('debug', { level: 'log', message: ['Socket closed with event', event] });
            switch (event.code) {
                default:
                    _this.scheduleReconnect();
            }
        });
        this.socket.addEventListener('open', function () {
            if (_this.token) {
                _this.send({
                    type: CommandType.identify,
                    data: {
                        token: _this.token
                    }
                });
            }
        });
    };
    IMWebSocketClient.prototype.send = function (command) {
        this.sendRaw(JSON.stringify(command));
    };
    IMWebSocketClient.prototype.sendRaw = function (text) {
        this.socket.send(text);
    };
    IMWebSocketClient.prototype.scheduleReconnect = function () {
        var _this = this;
        setTimeout(function () { return _this.connect(); }, this.reconnectInterval);
    };
    IMWebSocketClient.prototype.parse = function (raw) {
        try {
            var payload = JSON.parse(raw);
        }
        catch (e) {
            this.emit('debug', { level: 'error', message: [e] });
            return;
        }
        if (!isEvent(payload)) {
            return;
        }
        this.emit(payload.type, payload.data);
    };
    return IMWebSocketClient;
}(events_1.EventEmitter));
exports.IMWebSocketClient = IMWebSocketClient;
//# sourceMappingURL=client.js.map