"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const utils_1 = require("../../utils");
const BaseModel_1 = require("./BaseModel");
let Client = class Client extends BaseModel_1.BaseModel {
    static encryptPassword(instance) {
        instance.clientSecret = utils_1.Utils.encryptPassword(instance.clientSecret);
    }
};
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Client.prototype, "clientId", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Client.prototype, "clientSecret", void 0);
__decorate([
    sequelize_typescript_1.BeforeSave,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Client]),
    __metadata("design:returntype", void 0)
], Client, "encryptPassword", null);
Client = __decorate([
    sequelize_typescript_1.Table
], Client);
exports.Client = Client;
//# sourceMappingURL=Client.js.map