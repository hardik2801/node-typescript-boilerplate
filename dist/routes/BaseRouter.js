"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class BaseRouter {
    constructor() {
        this.router = express.Router();
        const limiter = require('express-limiter')(this.router);
        limiter({
            lookup: 'user.id',
            // 150 requests per hour
            total: 150,
            expire: 1000 * 60 * 60
        });
    }
}
exports.BaseRouter = BaseRouter;
//# sourceMappingURL=BaseRouter.js.map