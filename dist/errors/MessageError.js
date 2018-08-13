"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = require("./BaseError");
class MessageError extends BaseError_1.BaseError {
    constructor(errorString) {
        super(errorString, 106, MessageError.name);
    }
}
exports.MessageError = MessageError;
//# sourceMappingURL=MessageError.js.map