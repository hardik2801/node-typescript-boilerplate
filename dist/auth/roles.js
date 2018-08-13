"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthError_1 = require("../errors/AuthError");
const ConnectRoles = require('connect-roles');
class Roles {
    static middleware() {
        return Roles.connectRoles.middleware();
    }
    static is() {
        return Roles.connectRoles.is('admin');
    }
    static buildRoles() {
        Roles.connectRoles = new ConnectRoles({
            failureHandler: function (req, res, action) {
                const error = new AuthError_1.AuthError('Access Denied - You don\'t have permission to: ' + action);
                res.status(403).json(error);
            },
            async: true
        });
        Roles.connectRoles.use('admin', function (req) {
            if (req.user.role === 'admin') {
                return true;
            }
        });
        Roles.connectRoles.use('modify user', function (req) {
            if (Roles.isAdmin(req.user)) {
                return true;
            }
            else {
                return req.user.id === req.params.id || req.user.email === req.query.email;
            }
        });
    }
    static isAdmin(user) {
        return user.role === 'admin';
    }
}
exports.Roles = Roles;
//# sourceMappingURL=roles.js.map