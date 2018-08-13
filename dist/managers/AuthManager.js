"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/entities/User");
const AccessToken_1 = require("../models/entities/AccessToken");
const NotFoundError_1 = require("../errors/NotFoundError");
class AuthManager {
    constructor() {
    }
    getUserByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const storedToken = yield AccessToken_1.AccessToken.find({ where: { token: token }, include: [User_1.User] });
            if (storedToken && storedToken.user) {
                return storedToken.user;
            }
            else {
                throw new NotFoundError_1.NotFoundError("No user found with provided token");
            }
        });
    }
    getAccessTokenForUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = yield AccessToken_1.AccessToken.findOne({ where: { userId: userId } });
            if (accessToken) {
                return accessToken;
            }
            else {
                throw new NotFoundError_1.NotFoundError("No access token found for the provided user");
            }
        });
    }
    logout(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = yield AccessToken_1.AccessToken.findOne({ where: { userId: user.id } });
            if (accessToken) {
                return accessToken.destroy();
            }
            else {
                throw new NotFoundError_1.NotFoundError("No access token found for the provided user");
            }
        });
    }
}
exports.AuthManager = AuthManager;
//# sourceMappingURL=AuthManager.js.map