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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMChatClient = void 0;
var endpoints_1 = require("./endpoints");
var _client_core_1 = require("./_client-core");
if (typeof window !== "object" || typeof window.Blob === "undefined") {
    var Blob = require('blob').default;
}
var IMChatClient = /** @class */ (function (_super) {
    __extends(IMChatClient, _super);
    function IMChatClient() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.search = new _client_core_1.SearchClient(_this.client).using(endpoints_1.searchChats, endpoints_1.bulkSearchChats);
        return _this;
    }
    /**
     * Sends a plugin message to a given chat, returning the created message records
     * @param chatID chatID of the chat to send a message in
     * @param options plugin construction options
     */
    IMChatClient.prototype.sendPluginMessage = function (chatID, options) {
        return __awaiter(this, void 0, void 0, function () {
            var messages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post(endpoints_1.chatPluginMessage(chatID), options)];
                    case 1:
                        messages = (_a.sent()).data.messages;
                        return [2 /*return*/, messages];
                }
            });
        });
    };
    /**
     * Sends a message to a given chat, returning the created message records from the request
     * @param chatID chatID of the chat to send a message in
     * @param options options to use when crafting the message
     */
    IMChatClient.prototype.sendMessage = function (chatID, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, messages;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = options;
                        return [4 /*yield*/, Promise.all(options.parts.map(function (part) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, _b, atob, mime, byteCharacters, byteArrays, offset, slice, byteNumbers, i, _c, file, _d;
                                return __generator(this, function (_e) {
                                    switch (_e.label) {
                                        case 0:
                                            _a = part.type;
                                            switch (_a) {
                                                case "text": return [3 /*break*/, 1];
                                                case "attachment": return [3 /*break*/, 2];
                                            }
                                            return [3 /*break*/, 9];
                                        case 1: return [2 /*return*/, part];
                                        case 2:
                                            _b = part.details.substring(0, 4);
                                            switch (_b) {
                                                case "data": return [3 /*break*/, 3];
                                                case "http": return [3 /*break*/, 5];
                                            }
                                            return [3 /*break*/, 8];
                                        case 3:
                                            // base64 string
                                            if (typeof (window === null || window === void 0 ? void 0 : window.atob) === 'undefined') {
                                                atob = require('atob');
                                            }
                                            mime = part.details.substring("data:".length, part.details.indexOf(";base64"));
                                            byteCharacters = atob(part.details.substring(part.details.indexOf(",") + 1));
                                            byteArrays = [];
                                            for (offset = 0; offset < byteCharacters.length; offset += 512) {
                                                slice = byteCharacters.slice(offset, offset + 512);
                                                byteNumbers = new Array(slice.length);
                                                for (i = 0; i < slice.length; i++) {
                                                    byteNumbers[i] = slice.charCodeAt(i);
                                                }
                                                byteArrays.push(new Uint8Array(byteNumbers));
                                            }
                                            _c = part;
                                            return [4 /*yield*/, this.client.attachments.create(new Blob(byteArrays, { type: mime }), mime).then(function (_a) {
                                                    var id = _a.id;
                                                    return id;
                                                })];
                                        case 4:
                                            _c.details = _e.sent();
                                            return [2 /*return*/, part];
                                        case 5: return [4 /*yield*/, this.axios({
                                                url: part.details,
                                                method: "GET",
                                                responseType: "blob"
                                            })];
                                        case 6:
                                            file = _e.sent();
                                            _d = part;
                                            return [4 /*yield*/, this.client.attachments.create(file.data, file.data.type).then(function (_a) {
                                                    var id = _a.id;
                                                    return id;
                                                })];
                                        case 7:
                                            _d.details = _e.sent();
                                            return [2 /*return*/, part];
                                        case 8: 
                                        // ID
                                        return [2 /*return*/, part];
                                        case 9: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.parts = _b.sent();
                        return [4 /*yield*/, this.post(endpoints_1.chatMessages(chatID), options)];
                    case 2:
                        messages = (_b.sent()).data.messages;
                        return [2 /*return*/, messages];
                }
            });
        });
    };
    /**
     * Gets an array of messages for a chat with the given criteria
     * @param chatID chatID of the chat to query messages from
     * @param params parameters to apply when querying for messages
     */
    IMChatClient.prototype.fetchRecentMessages = function (chatID, params) {
        return __awaiter(this, void 0, void 0, function () {
            var messages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(endpoints_1.chatMessages(chatID), {
                            params: params
                        })];
                    case 1:
                        messages = (_a.sent()).data.messages;
                        return [2 /*return*/, messages];
                }
            });
        });
    };
    /**
     * Gets chat records from the API, starting with the most recent.
     * @param limit max number of chats to retrieve
     */
    IMChatClient.prototype.fetchAll = function (limit) {
        return __awaiter(this, void 0, void 0, function () {
            var chatRepresentations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(endpoints_1.chats, {
                            params: {
                                limit: limit
                            }
                        })];
                    case 1:
                        chatRepresentations = (_a.sent()).data.chatRepresentations;
                        return [2 /*return*/, chatRepresentations];
                }
            });
        });
    };
    /**
     * Deletes a chat record from the API, returning the deleted chat
     *
     * @param chatID the group ID of the chat to delete
     */
    IMChatClient.prototype.deleteChat = function (chatID) {
        return __awaiter(this, void 0, void 0, function () {
            var chatRepresentation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.delete(endpoints_1.chat(chatID))];
                    case 1:
                        chatRepresentation = (_a.sent()).data;
                        return [2 /*return*/, chatRepresentation];
                }
            });
        });
    };
    /**
     * Inserts a chat record and returns it
     * @param options chat to create
     */
    IMChatClient.prototype.create = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var chatRepresentation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post(endpoints_1.chats, options)];
                    case 1:
                        chatRepresentation = (_a.sent()).data;
                        return [2 /*return*/, chatRepresentation];
                }
            });
        });
    };
    /**
     * Renames a chat record, returning the updated chat
     * @param chatID chatID of the chat to update
     * @param name new name for the chat
     */
    IMChatClient.prototype.rename = function (chatID, name) {
        return __awaiter(this, void 0, void 0, function () {
            var chatRepresentation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.patch(endpoints_1.chatName(chatID), { name: name })];
                    case 1:
                        chatRepresentation = (_a.sent()).data;
                        return [2 /*return*/, chatRepresentation];
                }
            });
        });
    };
    /**
     * Sets whether or not the user is composing
     * @param chatID
     * @param isTyping
     */
    IMChatClient.prototype.setTyping = function (chatID, isTyping) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this[isTyping ? "post" : "delete"](endpoints_1.chatTyping(chatID))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gets a chat record from the API
     * @param chatID chatID of the chat to retrieve
     */
    IMChatClient.prototype.fetchOne = function (chatID) {
        return __awaiter(this, void 0, void 0, function () {
            var chatRepresentation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!chatID) {
                            console.warn(new Error("ChatID was not provided"));
                        }
                        return [4 /*yield*/, this.get(endpoints_1.chat(chatID))];
                    case 1:
                        chatRepresentation = (_a.sent()).data;
                        return [2 /*return*/, chatRepresentation];
                }
            });
        });
    };
    /**
     * Marks all messages as read in a chat
     * @param chatID chatID of the chat to mark as read
     */
    IMChatClient.prototype.readAllMessages = function (chatID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post(endpoints_1.chatRead(chatID))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gets the latest properties for a chat
     * @param chatID chatID of the chat to query
     */
    IMChatClient.prototype.fetchProperties = function (chatID) {
        return __awaiter(this, void 0, void 0, function () {
            var properties;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(endpoints_1.chatProperties(chatID))];
                    case 1:
                        properties = (_a.sent()).data;
                        return [2 /*return*/, properties];
                }
            });
        });
    };
    /**
     * Edits the properties of a given chat
     * @param chatID chatID of the chat to mutate
     * @param properties properties to apply
     */
    IMChatClient.prototype.patchProperties = function (chatID, properties) {
        return __awaiter(this, void 0, void 0, function () {
            var newProperties;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.patch(endpoints_1.chatProperties(chatID), properties)];
                    case 1:
                        newProperties = (_a.sent()).data;
                        return [2 /*return*/, newProperties];
                }
            });
        });
    };
    /**
     * Re-join a group chat, returning the updated chat
     * @param chatID chatID of the chat to re-join
     */
    IMChatClient.prototype.join = function (chatID) {
        return __awaiter(this, void 0, void 0, function () {
            var chatRepresentation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(endpoints_1.chatJoin(chatID))];
                    case 1:
                        chatRepresentation = (_a.sent()).data;
                        return [2 /*return*/, chatRepresentation];
                }
            });
        });
    };
    /**
     * Returns an array of handle IDs for a given chat record
     * @param chatID chatID of the chat record to query
     */
    IMChatClient.prototype.fetchParticipants = function (chatID) {
        return __awaiter(this, void 0, void 0, function () {
            var handles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(endpoints_1.chatParticipants(chatID))];
                    case 1:
                        handles = (_a.sent()).data;
                        return [2 /*return*/, handles];
                }
            });
        });
    };
    /**
     * Adds an array of handle IDs to a chat record, returning the updated array of participants
     * @param chatID chatID of the chat to add participants to
     * @param participants participants to add to the chat
     */
    IMChatClient.prototype.addParticipants = function (chatID, participants) {
        return __awaiter(this, void 0, void 0, function () {
            var handles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.put(endpoints_1.chatParticipants(chatID), {
                            handles: participants
                        })];
                    case 1:
                        handles = (_a.sent()).data.handles;
                        return [2 /*return*/, handles];
                }
            });
        });
    };
    /**
     * Removes an array of handle IDs from a chat record, returning the updated array of participants
     * @param chatID chatID of the chat to remove participants from
     * @param participants participants to remove
     */
    IMChatClient.prototype.removeParticipants = function (chatID, participants) {
        return __awaiter(this, void 0, void 0, function () {
            var handles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.delete(endpoints_1.chatParticipants(chatID), {
                            handles: participants
                        })];
                    case 1:
                        handles = (_a.sent()).data.handles;
                        return [2 /*return*/, handles];
                }
            });
        });
    };
    return IMChatClient;
}(_client_core_1.ReliantHTTPClient));
exports.IMChatClient = IMChatClient;
//# sourceMappingURL=chat-client.js.map