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
const express = require("express");
const ClientManager_1 = require("../managers/ClientManager");
class ClientRouter {
    constructor() {
        this.clientManager = new ClientManager_1.ClientManager();
        this.router = express.Router();
        this.buildRoutes();
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // res.json(clients);
            }
            catch (error) {
                next(error);
            }
        });
    }
    buildRoutes() {
        this.router.get("/", this.get.bind(this));
    }
}
exports.ClientRouter = ClientRouter;
//# sourceMappingURL=ClientRouter.js.map