import {AuthError} from "../errors/AuthError";

const ConnectRoles = require('connect-roles');

export class Roles {

    public static connectRoles;

    public static middleware() {
        return Roles.connectRoles.middleware();
    }

    public static is() {
        return Roles.connectRoles.is('admin');
    }

    public static buildRoles() {

        Roles.connectRoles = new ConnectRoles({
            failureHandler: function (req, res, action) {
                const error = new AuthError('Access Denied - You don\'t have permission to: ' + action);
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
            if(Roles.isAdmin(req.user)) {
                return true;
            } else {
                return req.user.id === req.params.id || req.user.email === req.query.email;
            }
        });
    }

    private static isAdmin(user): boolean {
        return user.role === 'admin';
    }
}