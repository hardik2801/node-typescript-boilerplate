"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
class Utils {
    /**
     * Return a random int, used by `utils.uid()`
     *
     * @param {Number} min
     * @param {Number} max
     * @return {Number}
     */
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static encryptPassword(password) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map