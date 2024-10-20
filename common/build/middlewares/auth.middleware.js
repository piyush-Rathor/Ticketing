"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const configs_1 = require("../configs");
const configs_2 = require("../configs");
const service_1 = require("../service");
const checkToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const token = (_c = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a['authorization']) === null || _b === void 0 ? void 0 : _b.split(' ')) === null || _c === void 0 ? void 0 : _c.at(1);
        if (!token)
            return res.unauthorizedUser(configs_2.COMMON_MESSAGES.ERRORS.NO_TOKEN);
        const decoded = yield jwt.verify(token, configs_1.COMMON_CONSTANTS.JWT_KEY);
        if (!decoded || typeof decoded === 'string')
            return res.unauthorizedUser(configs_2.COMMON_MESSAGES.ERRORS.NOT_VALID);
        req.user = (yield (0, service_1.findUserWithId)(decoded.id));
        if (!req.user.isActive)
            return res.unauthorizedUser(configs_2.COMMON_MESSAGES.ERRORS.NOT_VALID);
        next();
    }
    catch (err) {
        return res.unauthorizedUser(configs_2.COMMON_MESSAGES.ERRORS.NOT_VALID);
    }
});
exports.checkToken = checkToken;
