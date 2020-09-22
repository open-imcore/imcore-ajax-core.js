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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchClient = exports.CoreHTTPClient = exports.ReliantHTTPClient = exports.StubHTTPClient = void 0;
var axios_1 = __importDefault(require("axios"));
var ratelimit_1 = require("./ratelimit");
axios_1.default.prototype.delete = function (url, data, config) {
    return this.request(Object.assign({}, config || {}, {
        method: "delete",
        url: url,
        data: data
    }));
};
var StubHTTPClient = /** @class */ (function () {
    function StubHTTPClient() {
    }
    Object.defineProperty(StubHTTPClient.prototype, "get", {
        get: function () {
            return this.axios.get;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StubHTTPClient.prototype, "patch", {
        get: function () {
            return this.axios.patch;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StubHTTPClient.prototype, "delete", {
        get: function () {
            return this.axios.delete;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StubHTTPClient.prototype, "post", {
        get: function () {
            return this.axios.post;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StubHTTPClient.prototype, "put", {
        get: function () {
            return this.axios.put;
        },
        enumerable: false,
        configurable: true
    });
    return StubHTTPClient;
}());
exports.StubHTTPClient = StubHTTPClient;
var ReliantHTTPClient = /** @class */ (function (_super) {
    __extends(ReliantHTTPClient, _super);
    function ReliantHTTPClient(client) {
        var _this = _super.call(this) || this;
        _this.client = client;
        _this.axios = client.axios;
        return _this;
    }
    Object.defineProperty(ReliantHTTPClient.prototype, "baseURL", {
        get: function () {
            return this.client.baseURL;
        },
        enumerable: false,
        configurable: true
    });
    return ReliantHTTPClient;
}(StubHTTPClient));
exports.ReliantHTTPClient = ReliantHTTPClient;
var CoreHTTPClient = /** @class */ (function (_super) {
    __extends(CoreHTTPClient, _super);
    function CoreHTTPClient(baseURL, axios) {
        var _this = _super.call(this) || this;
        _this.baseURL = baseURL;
        if (!axios) {
            _this.axios = axios_1.default.create({ baseURL: baseURL });
            new ratelimit_1.RatelimitResponseInterceptor(_this.axios).register(_this.axios);
        }
        else {
            _this.axios = axios;
        }
        return _this;
    }
    return CoreHTTPClient;
}(StubHTTPClient));
exports.CoreHTTPClient = CoreHTTPClient;
var SearchClient = /** @class */ (function (_super) {
    __extends(SearchClient, _super);
    function SearchClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchClient.prototype.using = function (singleURL, bulkURL) {
        this.singleURL = singleURL;
        this.bulkURL = bulkURL;
        return this;
    };
    SearchClient.prototype.single = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(this.singleURL, { params: params })];
                    case 1:
                        results = (_a.sent()).data.results;
                        return [2 /*return*/, results];
                }
            });
        });
    };
    SearchClient.prototype.bulk = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.post(this.bulkURL, params)];
                    case 1:
                        results = (_a.sent()).data;
                        return [2 /*return*/, results];
                }
            });
        });
    };
    return SearchClient;
}(ReliantHTTPClient));
exports.SearchClient = SearchClient;
//# sourceMappingURL=_client-core.js.map