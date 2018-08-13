"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClientRouter_1 = require("./ClientRouter");
const AuthRouter_1 = require("./AuthRouter");
const UserRouter_1 = require("./UserRouter");
class Router {
    static initializeRoutes(app) {
        app.use('/clients', new ClientRouter_1.ClientRouter().router);
        app.use('/oauth', new AuthRouter_1.AuthRouter().router);
        app.use('/users', new UserRouter_1.UserRouter().router);
    }
}
exports.Router = Router;
//# sourceMappingURL=index.js.map