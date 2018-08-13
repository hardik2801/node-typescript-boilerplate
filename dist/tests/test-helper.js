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
const server_1 = require("../server");
const request = require("supertest");
const UserManager_1 = require("../managers/UserManager");
const RoleEnum_1 = require("../models/enums/RoleEnum");
class TestHelper {
    static initializeTestSuite() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield server_1.Server.initializeApp();
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getAuthToken(role, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userName;
                if (email) {
                    userName = email;
                }
                else {
                    userName = yield TestHelper.getEmailForRole(role);
                }
                console.log('USERNAME: ', userName);
                const response = yield request(server_1.Server.app)
                    .post('/oauth/token')
                    .send({
                    'username': userName,
                    'password': 'password',
                    'grant_type': 'password'
                })
                    .set('Accept', 'application/json');
                expect(response.body).toEqual(expect.objectContaining({
                    access_token: expect.any(String)
                }));
                return response.body.access_token;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static createMember(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userManager = new UserManager_1.UserManager();
            return userManager.createUser(email || 'test.member@gmail.com', 'password', 'Test', 'Member', RoleEnum_1.RoleEnum.MEMBER);
        });
    }
    static createAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const userManager = new UserManager_1.UserManager();
            return userManager.createUser('test.admin@gmail.com', 'password', 'Test', 'Admin', RoleEnum_1.RoleEnum.ADMIN);
        });
    }
    static getEmailForRole(role) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (role) {
                case RoleEnum_1.RoleEnum.ADMIN:
                    return 'test.admin@gmail.com';
                case RoleEnum_1.RoleEnum.MEMBER:
                    return 'test.member@gmail.com';
            }
        });
    }
}
exports.TestHelper = TestHelper;
//# sourceMappingURL=test-helper.js.map