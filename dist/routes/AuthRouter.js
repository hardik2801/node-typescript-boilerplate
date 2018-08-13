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
const oauth2_1 = require("../auth/oauth2");
const AuthManager_1 = require("../managers/AuthManager");
const auth_1 = require("../auth/auth");
const BaseRouter_1 = require("./BaseRouter");
class AuthRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this.authManager = new AuthManager_1.AuthManager();
        this.buildRoutes();
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.authManager.logout(req.user);
                res.json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    buildRoutes() {
        const oath = new oauth2_1.Oauth2();
        this.router.post("/token", oath.getTokenEndpoint());
        this.router.post("/logout", auth_1.Auth.getBearerMiddleware(), this.logout.bind(this));
    }
}
exports.AuthRouter = AuthRouter;
//# sourceMappingURL=AuthRouter.js.map