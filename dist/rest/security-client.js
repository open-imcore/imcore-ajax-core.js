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
exports.IMSecurityClient = exports.IMTokenGrant = void 0;
var _client_core_1 = require("./_client-core");
var endpoints_1 = require("./endpoints");
/** Grants that can be applied to a token **/
var IMTokenGrant;
(function (IMTokenGrant) {
    /** The human grant is required to allow new tokens to be generated */
    IMTokenGrant["human"] = "human";
    /** use the streaming API */
    IMTokenGrant["streaming"] = "streaming";
    /** use the debugging API */
    IMTokenGrant["debugging"] = "debugging";
    /** read chat data */
    IMTokenGrant["readChats"] = "readChats";
    /** modify, create, delete chats*/
    IMTokenGrant["writeChats"] = "writeChats";
    /** read contacts data */
    IMTokenGrant["readContacts"] = "readContacts";
    /** modify, create, delete contacts */
    IMTokenGrant["writeContacts"] = "writeContacts";
    /** read messages data */
    IMTokenGrant["readMessages"] = "readMessages";
    /** modify, create, delete messages */
    IMTokenGrant["writeMessages"] = "writeMessages";
    /** read attachments data */
    IMTokenGrant["readAttachments"] = "readAttachments";
    /** modify, create, delete attachments*/
    IMTokenGrant["writeAttachments"] = "writeAttachments";
})(IMTokenGrant = exports.IMTokenGrant || (exports.IMTokenGrant = {}));
var IMSecurityClient = /** @class */ (function (_super) {
    __extends(IMSecurityClient, _super);
    function IMSecurityClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Creates a user token using the psk
     * @param psk pre-defined psk
     * @param updateStoredToken whether to set the global token to the result
     */
    IMSecurityClient.prototype.token = function (psk, updateStoredToken) {
        if (updateStoredToken === void 0) { updateStoredToken = false; }
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post(endpoints_1.securityToken, {
                            psk: psk
                        }).then(function (r) { return r.data; })];
                    case 1:
                        token = (_a.sent()).token;
                        if (updateStoredToken)
                            this.client.token = token;
                        return [2 /*return*/, token];
                }
            });
        });
    };
    /**
     * Creates a bot token with the given grants
     * @param grants grants to include in the token
     * @param updateStoredToken whether to set the global token to the result
     */
    IMSecurityClient.prototype.botToken = function (grants, updateStoredToken) {
        if (updateStoredToken === void 0) { updateStoredToken = false; }
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post(endpoints_1.securityBotToken, {
                            grants: grants
                        }).then(function (r) { return r.data; })];
                    case 1:
                        token = (_a.sent()).token;
                        if (updateStoredToken)
                            this.client.token = token;
                        return [2 /*return*/, token];
                }
            });
        });
    };
    /**
     * Opens an attachment session allowing <img> tags to load
     */
    IMSecurityClient.prototype.attachmentSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(endpoints_1.securityAttachmentsSession)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Changes the PSK. The old PSK can be omitted if there is no pre-defined PSK.
     * @param options old and new PSK
     * @param updateStoredToken whether to set the global token to the result
     */
    IMSecurityClient.prototype.changePSK = function (options, updateStoredToken) {
        if (updateStoredToken === void 0) { updateStoredToken = false; }
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.patch(endpoints_1.securityPSK, options).then(function (r) { return r.data; })];
                    case 1:
                        token = (_a.sent()).token;
                        if (updateStoredToken)
                            this.client.token = token;
                        return [2 /*return*/, token];
                }
            });
        });
    };
    return IMSecurityClient;
}(_client_core_1.ReliantHTTPClient));
exports.IMSecurityClient = IMSecurityClient;
//# sourceMappingURL=security-client.js.map