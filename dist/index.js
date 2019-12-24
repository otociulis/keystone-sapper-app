"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.__esModule = true;
var path_1 = require("path");
var ora = require("ora");
var SapperApp = (function () {
    function SapperApp(options) {
        this._options = {
            skipDevelopmentBuild: false,
            path: "__sapper__/dev",
            buildOptions: {
                cwd: "."
            }
        };
        var buildOptions = (options || {}).buildOptions;
        this._options = __assign(__assign(__assign({}, (options || {})), this._options), { buildOptions: __assign(__assign({}, this._options.buildOptions), buildOptions) });
    }
    SapperApp.prototype.prepareMiddleware = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var dev, distDir, dir, spinner, err_1, serverPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dev = args.dev, distDir = args.distDir;
                        dir = dev ? "" + this._options.path : distDir;
                        if (!(dev && !this._options.skipDevelopmentBuild)) return [3, 4];
                        spinner = ora().start("Building Sapper application");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.build({ distDir: dir })];
                    case 2:
                        _a.sent();
                        spinner.succeed();
                        return [3, 4];
                    case 3:
                        err_1 = _a.sent();
                        spinner.fail(err_1);
                        return [3, 4];
                    case 4:
                        serverPath = path_1.resolve(dir, "server/server.js");
                        return [2, require(serverPath)()];
                }
            });
        });
    };
    SapperApp.prototype.build = function (args) {
        var distDir = args.distDir;
        var options = __assign({ dest: distDir }, this._options.buildOptions);
        return require("sapper/api").build(options);
    };
    return SapperApp;
}());
exports.SapperApp = SapperApp;
