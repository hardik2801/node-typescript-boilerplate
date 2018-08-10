"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClientRouter_1 = require("./ClientRouter");
// import {AuthRouter} from "./AuthRouter";
// import {UserRouter} from "./UserRouter";
class Router {
    static initializeRoutes(app) {
        app.use('/login', new ClientRouter_1.ClientRouter().router);
        // app.use('/oauth', new AuthRouter().router);
        // app.use('/users', new UserRouter().router);
    }
}
exports.Router = Router;
//# sourceMappingURL=index.js.map