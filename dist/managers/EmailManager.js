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
class EmailManager extends MessageManager_1.MessageManager {
    constructor() {
        super('');
    }
    sendMail(destinations, returnAddress, source, messageSubject, messageBody) {
        const email = {
            Destination: {
                ToAddresses: destinations
            },
            Message: {
                Body: {
                    Html: {
                        Charset: 'UTF-8',
                        Data: messageBody
                    },
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: messageSubject
                }
            },
            ReturnPath: returnAddress,
            Source: source
        };
        this.publish(email).then(() => {
        }, () => {
        });
    }
    handleMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.EmailManager = EmailManager;
//# sourceMappingURL=EmailManager.js.map