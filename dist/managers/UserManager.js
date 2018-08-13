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
const models_1 = require("../models");
const NotFoundError_1 = require("../errors/NotFoundError");
const auth_1 = require("../auth/auth");
const AuthError_1 = require("../errors/AuthError");
class UserManager {
    constructor() {
    }
    createUser(email, password, firstName, lastName) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = new models_1.User({
                firstName,
                lastName,
                email,
                password
            });
            return newUser.save();
        });
    }
    updateUser(userId, email, firstName, lastName, profilePicUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.User.find({ where: { id: userId } });
            if (user) {
                user.email = email || user.email;
                user.firstName = firstName || user.firstName;
                user.lastName = lastName || user.lastName;
                return user.save();
            }
            else {
                throw new NotFoundError_1.NotFoundError("No user found");
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.User.findOne({ where: { email: email } });
            if (user) {
                return user;
            }
            else {
                throw new NotFoundError_1.NotFoundError("No user found with the provided email");
            }
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.User.find({ where: { id: userId } });
            if (user) {
                yield user.destroy();
                return user;
            }
            else {
                throw new NotFoundError_1.NotFoundError("No user found");
            }
        });
    }
    updatePassword(userId, currentPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.User.find({ where: { id: userId } });
            if (user) {
                const authorized = yield auth_1.Auth.comparePasswords(currentPassword, user.password);
                if (authorized) {
                    user.password = newPassword;
                    return user.save();
                }
                else {
                    throw new AuthError_1.AuthError("Current password incorrect");
                }
            }
            else {
                throw new NotFoundError_1.NotFoundError("No user found");
            }
        });
    }
}
exports.UserManager = UserManager;
//# sourceMappingURL=UserManager.js.map