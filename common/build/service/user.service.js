"use strict";
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
exports.createUser = exports.findUserWithId = exports.findUserWithEmail = exports.findActiveUserWithEmailIncludePassword = void 0;
const user_model_1 = require("../models/user.model");
const findActiveUserWithEmailIncludePassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findOne({ email, isActive: true });
});
exports.findActiveUserWithEmailIncludePassword = findActiveUserWithEmailIncludePassword;
const findUserWithEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findOne({ email }).select({ password: 0 });
});
exports.findUserWithEmail = findUserWithEmail;
const findUserWithId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id);
    return user === null || user === void 0 ? void 0 : user.toJSON();
});
exports.findUserWithId = findUserWithId;
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new user_model_1.User(data);
    return yield newUser.saveUser();
});
exports.createUser = createUser;
