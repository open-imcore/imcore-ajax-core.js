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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
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
        _this.delegates = {};
        _this.killed = false;
        _this.open = false;
        return _this;
    }
    IMWebSocketClient.prototype.connect = function (_a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, preload = _b.preload, chatLimit = _b.chatLimit;
        var compiled = new URL(this.url);
        this.killed = false;
        this.open = true;
        if (preload) {
            compiled.searchParams.set("chatPreload", preload);
        }
        if (chatLimit) {
            compiled.searchParams.set("chatLimit", chatLimit.toFixed(0));
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
            _this.emit("close");
            _this.open = false;
            if (_this.killed)
                return;
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
    IMWebSocketClient.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pending;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.open)
                            return [2 /*return*/];
                        this.killed = true;
                        pending = new Promise(function (resolve) { return _this.once("close", resolve); });
                        this.socket.close();
                        return [4 /*yield*/, pending];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    IMWebSocketClient.prototype.emit = function (name) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var delegate in this.delegates) {
            (_a = this.delegates[delegate]).emit.apply(_a, __spreadArrays([name], args));
        }
        return _super.prototype.emit.apply(this, __spreadArrays([name], args));
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