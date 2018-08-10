"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = require("./BaseError");
class DatabaseError extends BaseError_1.BaseError {
    constructor(errorString) {
        super(errorString, 102, '');
    }
}
exports.DatabaseError = DatabaseError;
//# sourceMappingURL=DatabaseError.js.map