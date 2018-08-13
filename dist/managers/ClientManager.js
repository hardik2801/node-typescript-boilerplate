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
const Client_1 = require("../models/entities/Client");
const NotFoundError_1 = require("../errors/NotFoundError");
class ClientManager {
    constructor() {
    }
    createClient(clientId, clientSecret) {
        return __awaiter(this, void 0, void 0, function* () {
            let newClient = new Client_1.Client({ clientId, clientSecret });
            return newClient.save();
        });
    }
    updateClient(clientId, clientSecret) {
        return __awaiter(this, void 0, void 0, function* () {
            let client = yield Client_1.Client.find({ where: { clientId: clientId } });
            if (client) {
                client.clientId = clientId;
                client.clientSecret = clientSecret;
                return client.save();
            }
            else {
                throw new NotFoundError_1.NotFoundError("No client found with that id");
            }
        });
    }
    deleteClient(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            let client = yield Client_1.Client.find({ where: { clientId: clientId } });
            if (client) {
                return client.destroy();
            }
            else {
                throw new NotFoundError_1.NotFoundError("No client found with that id");
            }
        });
    }
}
exports.ClientManager = ClientManager;
//# sourceMappingURL=ClientManager.js.map