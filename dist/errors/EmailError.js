"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = require("./BaseError");
class EmailError extends BaseError_1.BaseError {
    constructor(errorString) {
        super(errorString, 105, '');
    }
}
exports.EmailError = EmailError;
//# sourceMappingURL=EmailError.js.map