"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oauth2_1 = require("../auth/oauth2");
const BaseRouter_1 = require("./BaseRouter");
class AuthRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this.buildRoutes();
    }
    buildRoutes() {
        const oath = new oauth2_1.Oauth2();
    }
}
exports.AuthRouter = AuthRouter;
//# sourceMappingURL=AuthRouter.js.map