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
const MessageManager_1 = require("./MessageManager");
class S3Manager extends MessageManager_1.MessageManager {
    constructor() {
        super('');
    }
    uploadImage(image, destination, fileName) {
        const imageParams = {
            Key: destination + '/' + fileName,
            Body: image.buffer.toString('base64'),
            ACL: 'public-read'
        };
        this.publish(imageParams).then(() => {
        }, () => {
        });
    }
    handleMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            message.Body = new Buffer(message.Body, 'base64');
        });
    }
}
exports.S3Manager = S3Manager;
//# sourceMappingURL=S3Manager.js.map