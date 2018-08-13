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
const test_helper_1 = require("./test-helper");
const request = require('supertest');
let testServer;
let memberToken;
let adminToken;
let member;
let admin;
beforeAll(() => __awaiter(this, void 0, void 0, function* () {
    testServer = yield test_helper_1.TestHelper.initializeTestSuite();
    member = yield test_helper_1.TestHelper.createMember();
    admin = yield test_helper_1.TestHelper.createAdmin();
    adminToken = yield test_helper_1.TestHelper.getAuthToken(admin.role);
    memberToken = yield test_helper_1.TestHelper.getAuthToken(member.role);
}));
describe('Get all users', () => {
    test('should respond with all users', () => __awaiter(this, void 0, void 0, function* () {
        console.log('ADMIN TOKEN: ', adminToken);
        const response = yield request(server_1.Server.app)
            .get('/users')
            .set('Authorization', 'Bearer ' + adminToken)
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(2);
    }));
    it('should respond with 403', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield request(server_1.Server.app)
                .get('/users')
                .set('Authorization', 'Bearer ' + memberToken)
                .set('Accept', 'application/json');
            expect(response.statusCode).toBe(403);
        });
    });
});
describe('Get user by email', () => {
    test('should respond with a member when member requests itself', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(server_1.Server.app)
            .get(`/users?email=${member.email}`)
            .set('Authorization', 'Bearer ' + memberToken)
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            firstName: 'Test',
            lastName: 'Member',
            email: 'test.member@gmail.com',
            profilePicUrl: null
        }));
    }));
    test('should respond with a member when admin requests member', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(server_1.Server.app)
            .get(`/users?email=${member.email}`)
            .set('Authorization', 'Bearer ' + adminToken)
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            firstName: 'Test',
            lastName: 'Member',
            email: 'test.member@gmail.com',
            profilePicUrl: null
        }));
    }));
    test('should respond with a forbidden error when member requests admin', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(server_1.Server.app)
            .get(`/users?email=test.admin@gmail.com`)
            .set('Authorization', 'Bearer ' + memberToken)
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(403);
    }));
});
describe('Create New User', () => {
    test('should respond with a newly created user', () => __awaiter(this, void 0, void 0, function* () {
        const newUser = {
            "firstName": "Stephanie",
            "lastName": "Tipper",
            "profilePicUrl": "",
            "email": "tipper@gmail.com",
            "password": "password",
            "role": "member"
        };
        const response = yield request(server_1.Server.app)
            .post('/users')
            .type('json')
            .set('Authorization', 'Bearer ' + adminToken)
            .set('Accept', 'application/json')
            .send(newUser);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            firstName: "Stephanie",
            lastName: "Tipper",
            profilePicUrl: "",
            email: "tipper@gmail.com"
        }));
    }));
    test('should fail with email required', () => __awaiter(this, void 0, void 0, function* () {
        const newUser = {
            "firstName": "Stephanie",
            "lastName": "Tipper",
            "profilePicUrl": "",
            "password": "password",
            "role": "member"
        };
        const response = yield request(server_1.Server.app)
            .post('/users')
            .type('json')
            .set('Authorization', 'Bearer ' + adminToken)
            .set('Accept', 'application/json')
            .send(newUser);
        expect(response.statusCode).toBe(400);
    }));
});
describe('Get Current User', () => {
    test('member should be able retrieve himself', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(server_1.Server.app)
            .get(`/users/current`)
            .set('Authorization', 'Bearer ' + memberToken)
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            firstName: 'Test',
            lastName: 'Member',
            email: 'test.member@gmail.com',
            profilePicUrl: null
        }));
    }));
});
describe('Change Password', () => {
    test('member should be able to change his own password', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(server_1.Server.app)
            .put(`/users/${member.id}/password`)
            .type('json')
            .set('Authorization', 'Bearer ' + memberToken)
            .set('Accept', 'application/json')
            .send({ currentPassword: 'password', newPassword: 'newPassword' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            firstName: 'Test',
            lastName: 'Member',
            email: 'test.member@gmail.com',
            profilePicUrl: null
        }));
    }));
    test('member should be able to retrieve token with new password', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(server_1.Server.app)
            .post('/oauth/token')
            .send({
            'username': member.email,
            'password': 'newPassword',
            'grant_type': 'password'
        })
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            access_token: expect.any(String)
        }));
    }));
    test('member should not be able to change admin password', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(server_1.Server.app)
            .put(`/users/${admin.id}/password`)
            .type('json')
            .set('Authorization', 'Bearer ' + memberToken)
            .set('Accept', 'application/json')
            .send({ currentPassword: 'password', newPassword: 'newPassword' });
        expect(response.statusCode).toBe(403);
    }));
});
describe('Update User', () => {
    test('member should be able to update self', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(server_1.Server.app)
            .put(`/users/${member.id}`)
            .type('json')
            .set('Authorization', 'Bearer ' + memberToken)
            .set('Accept', 'application/json')
            .send({ lastName: 'New Name' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            firstName: "Test",
            lastName: "New Name",
            profilePicUrl: null,
            email: "test.member@gmail.com"
        }));
    }));
    test('member should not be able to update admin', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(server_1.Server.app)
            .put(`/users/${admin.id}`)
            .type('json')
            .set('Authorization', 'Bearer ' + memberToken)
            .set('Accept', 'application/json')
            .send({ lastName: 'New Name' });
        expect(response.statusCode).toBe(403);
    }));
    test('admin should be able to update member', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(server_1.Server.app)
            .put(`/users/${member.id}`)
            .type('json')
            .set('Authorization', 'Bearer ' + adminToken)
            .set('Accept', 'application/json')
            .send({ lastName: 'New New Name' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            firstName: "Test",
            lastName: "New New Name",
            profilePicUrl: null,
            email: "test.member@gmail.com"
        }));
    }));
});
describe('Delete User', () => {
    test('member should not be able to delete admin', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(server_1.Server.app)
            .delete(`/users/${admin.id}`)
            .type('json')
            .set('Authorization', 'Bearer ' + memberToken)
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(403);
    }));
    test('admin should be able to delete member', () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(server_1.Server.app)
            .delete(`/users/${member.id}`)
            .type('json')
            .set('Authorization', 'Bearer ' + adminToken)
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    }));
});
afterAll(function () {
    testServer.close();
});
//# sourceMappingURL=users.test.js.map