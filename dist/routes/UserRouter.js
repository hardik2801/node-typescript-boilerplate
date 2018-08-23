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
const UserManager_1 = require("../managers/UserManager");
const auth_1 = require("../auth/auth");
const UserDTO_1 = require("../models/dtos/UserDTO");
const roles_1 = require("../auth/roles");
const BaseRouter_1 = require("./BaseRouter");
const YapsodyAuth = require("yap-auth-client/index.js");
class UserRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this.jwtSecret = process.env.JWT_SECRET || 'Yapsody_auth';
        this.userManager = new UserManager_1.UserManager();
        this.buildRoutes();
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.query.email) {
                    const user = yield this.userManager.findByEmail(req.query.email);
                    res.json(new UserDTO_1.UserDTO(user));
                }
                else {
                    const users = yield models_1.User.findAll();
                    const userDTOs = users.map(user => {
                        return new UserDTO_1.UserDTO(user);
                    });
                    res.json(userDTOs);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    post(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userManager.createUser(req.body.email, req.body.password, req.body.firstName, req.body.lastName);
                res.json(new UserDTO_1.UserDTO(user));
            }
            catch (error) {
                next(error);
            }
        });
    }
    put(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userManager.updateUser(req.params.id, req.body.email, req.body.firstName, req.body.lastName, req.body.role);
                res.json(new UserDTO_1.UserDTO(user));
            }
            catch (error) {
                next(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userManager.deleteUser(req.params.id);
                res.json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getByToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.json(new UserDTO_1.UserDTO(req.user));
            }
            catch (error) {
                next(error);
            }
        });
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userManager.updatePassword(req.params.id, req.body.currentPassword, req.body.newPassword);
                res.json(new UserDTO_1.UserDTO(user));
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAccessToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield YapsodyAuth.verifyUser(req);
                res.send(newUser);
            }
            catch (error) {
                res.status(error.code).send(error.message);
            }
        });
    }
    verifyAccessToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('coming here!');
            try {
                const data = yield YapsodyAuth.verifyUser(req);
                res.send(data);
            }
            catch (error) {
                res.status(error.code).send(error.message);
                console.log(error, 'err user route');
            }
        });
    }
    registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield YapsodyAuth.registerUser(req);
                res.send(newUser);
            }
            catch (error) {
                res.status(error.code).send(error.message);
            }
        });
    }
    buildRoutes() {
        this.router.post("/login", this.getAccessToken.bind(this));
        this.router.post("/verify", this.verifyAccessToken.bind(this));
        this.router.post("/registeruser", this.registerUser.bind(this));
        this.router.post("/", this.post.bind(this));
        this.router.delete("/:id", auth_1.Auth.getBearerMiddleware(), roles_1.Roles.connectRoles.can('modify user'), this.delete.bind(this));
        this.router.put("/:id", auth_1.Auth.getBearerMiddleware(), roles_1.Roles.connectRoles.can('modify user'), this.put.bind(this));
        this.router.get("/current", auth_1.Auth.getBearerMiddleware(), this.getByToken.bind(this));
        this.router.put("/:id/password", auth_1.Auth.getBearerMiddleware(), roles_1.Roles.connectRoles.can('modify user'), this.changePassword.bind(this));
    }
}
exports.UserRouter = UserRouter;
//# sourceMappingURL=UserRouter.js.map