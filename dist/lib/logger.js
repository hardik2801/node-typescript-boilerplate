"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const winston = require("winston");
const level = process.env.LOG_LEVEL || 'debug';
exports.logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: level,
            timestamp: function () {
                return moment().format('YYYY-MM-DD hh:mm:ss').trim();
            }
        })
    ]
});
//# sourceMappingURL=logger.js.map