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
exports.RatelimitResponseInterceptor = exports.RequestInterceptor = exports.ResponseInterceptor = void 0;
var axios_1 = __importDefault(require("axios"));
axios_1.default.interceptors.request.use;
axios_1.default.interceptors.response.use();
var Interceptor = /** @class */ (function () {
    function Interceptor(client) {
        var _this = this;
        this.client = client;
        this.client.interceptors[this instanceof ResponseInterceptor ? "response" : "request"].use(function (conf) { return _this.onFulfilled(conf); }, function (err) { return _this.onRejected(err); });
    }
    Interceptor.prototype.onFulfilled = function (value) {
        return value;
    };
    Interceptor.prototype.onRejected = function (error) {
        return error;
    };
    return Interceptor;
}());
var ResponseInterceptor = /** @class */ (function (_super) {
    __extends(ResponseInterceptor, _super);
    function ResponseInterceptor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResponseInterceptor;
}(Interceptor));
exports.ResponseInterceptor = ResponseInterceptor;
var RequestInterceptor = /** @class */ (function (_super) {
    __extends(RequestInterceptor, _super);
    function RequestInterceptor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RequestInterceptor;
}(Interceptor));
exports.RequestInterceptor = RequestInterceptor;
var RetryAfter = "Retry-After".toLowerCase();
var RatelimitResponseInterceptor = /** @class */ (function (_super) {
    __extends(RatelimitResponseInterceptor, _super);
    function RatelimitResponseInterceptor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RatelimitResponseInterceptor.prototype.onRejected = function (error) {
        var _this = this;
        var response, retryAfter;
        if ((response = error.response) && (response.status === 429) && (retryAfter = +response.headers[RetryAfter]) && !isNaN(retryAfter)) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    return _this.client.request(error.config).then(resolve).catch(reject);
                }, (retryAfter * 1000) + 1000);
            });
        }
        return Promise.reject(error);
    };
    return RatelimitResponseInterceptor;
}(ResponseInterceptor));
exports.RatelimitResponseInterceptor = RatelimitResponseInterceptor;
//# sourceMappingURL=ratelimit.js.map