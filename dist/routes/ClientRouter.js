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
const index_1 = require("../models/index");
const auth_1 = require("../auth/auth");
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
                const clients = yield index_1.Client.findAll();
                res.json(clients);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield index_1.Client.findOne({ where: { clientId: req.params.id } });
                res.json(client);
            }
            catch (error) {
                next(error);
            }
        });
    }
    post(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newClient = yield this.clientManager.createClient(req.body.clientId, req.body.clientSecret);
                res.json(newClient);
            }
            catch (error) {
                next(error);
            }
        });
    }
    put(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedClient = yield this.clientManager.updateClient(req.body.clientId, req.body.clientSecret);
                res.json(updatedClient);
            }
            catch (error) {
                next(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = this.clientManager.deleteClient(req.body.clientId);
                res.json(client);
            }
            catch (error) {
                next(error);
            }
        });
    }
    buildRoutes() {
        this.router.get("/", auth_1.Auth.getBearerMiddleware(), this.get.bind(this));
        this.router.get("/:id", auth_1.Auth.getBearerMiddleware(), this.getById.bind(this));
        this.router.post("/", auth_1.Auth.getBearerMiddleware(), this.post.bind(this));
        this.router.put("/:id", auth_1.Auth.getBearerMiddleware(), this.put.bind(this));
        this.router.delete("/:id", auth_1.Auth.getBearerMiddleware(), this.delete.bind(this));
    }
}
exports.ClientRouter = ClientRouter;
//# sourceMappingURL=ClientRouter.js.map