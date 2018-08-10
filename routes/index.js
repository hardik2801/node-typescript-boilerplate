"use strict";
exports.__esModule = true;
var ClientRouter_1 = require("./ClientRouter");
// import {AuthRouter} from "./AuthRouter";
// import {UserRouter} from "./UserRouter";
var Router = /** @class */ (function () {
    function Router() {
    }
    Router.initializeRoutes = function (app) {
        app.use('/login', new ClientRouter_1.ClientRouter().router);
        // app.use('/oauth', new AuthRouter().router);
        // app.use('/users', new UserRouter().router);
    };
    return Router;
}());
exports.Router = Router;
