"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var request = require("request-promise-native");
var api_v1_1 = require("./api-v1");
var api_v5_1 = require("./api-v5");
var api_v6_1 = require("./api-v6");
var api_v1_2 = require("./api-v1");
exports.APIv1 = api_v1_2.APIv1;
/**
 * Common base class for all specialized APIs that support a range of devices
 */
var API = /** @class */ (function () {
    function API(
        /** The hostname this wrapper is bound to */
        hostname) {
        this.hostname = hostname;
        this._params = new Map();
    }
    API.prototype.create = function (hostname) {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // try all possibilities
                        // v1
                        ret = new api_v1_1.APIv1(hostname);
                        return [4 /*yield*/, ret.test()];
                    case 1:
                        if (_a.sent())
                            return [2 /*return*/, ret];
                        // v5
                        ret = new api_v5_1.APIv5(hostname);
                        return [4 /*yield*/, ret.test()];
                    case 2:
                        if (_a.sent())
                            return [2 /*return*/, ret];
                        // v6
                        ret = new api_v6_1.APIv6(hostname);
                        return [4 /*yield*/, ret.test()];
                    case 3:
                        if (_a.sent())
                            return [2 /*return*/, ret];
                        throw new Error("No supported device found at \"" + hostname + "\"");
                }
            });
        });
    };
    Object.defineProperty(API.prototype, "params", {
        /** Additional params that should be stored over several API uses */
        get: function () {
            return this._params;
        },
        enumerable: true,
        configurable: true
    });
    /** Performs a GET request on the given resource and returns the result */
    API.prototype.get = function (path, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var reqOpts;
            return __generator(this, function (_a) {
                reqOpts = Object.assign(options, {
                    uri: "" + this.requestPrefix + path,
                });
                return [2 /*return*/, request(reqOpts)];
            });
        });
    };
    /** Posts JSON data to the given resource and returns the result */
    API.prototype.postJSONwithDigestAuth = function (path, credentials, jsonPayload, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var reqOpts;
            return __generator(this, function (_a) {
                reqOpts = Object.assign(options, {
                    uri: "" + this.requestPrefix + path,
                    method: "POST",
                    json: jsonPayload,
                    auth: {
                        username: credentials.username,
                        password: credentials.password,
                        sendImmediately: false,
                    },
                });
                return [2 /*return*/, request(reqOpts)];
            });
        });
    };
    /** Posts JSON data to the given resource and returns the result */
    API.prototype.postJSON = function (path, jsonPayload, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var reqOpts;
            return __generator(this, function (_a) {
                reqOpts = Object.assign(options, {
                    uri: "" + this.requestPrefix + path,
                    method: "POST",
                    json: jsonPayload,
                });
                return [2 /*return*/, request(reqOpts)];
            });
        });
    };
    return API;
}());
exports.API = API;
