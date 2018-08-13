"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies.
 */
const oauth2orize = require("oauth2orize");
const passport = require("passport");
const index_1 = require("../models/index");
const jsonwebtoken_1 = require("jsonwebtoken");
const AuthError_1 = require("../errors/AuthError");
class Oauth2 {
    constructor() {
        this.server = oauth2orize.createServer();
        this.serializeClient();
        this.registerGrants();
        this.jwtSecret = process.env.JWT_SECRET || 'Yapsody_auth';
    }
    // token endpoint
    //
    // `token` middleware handles client requests to exchange authorization grants
    // for access tokens.  Based on the grant type being exchanged, the above
    // exchange middleware will be invoked to handle the request.  Clients must
    // authenticate when making requests to this endpoint.
    getTokenEndpoint() {
        return [
            passport.authenticate(['local'], { session: false }),
            this.server.token(),
            this.server.errorHandler()
        ];
    }
    // Register serialialization and deserialization functions.
    //
    // When a client redirects a user to user authorization endpoint, an
    // authorization transaction is initiated.  To complete the transaction, the
    // user must authenticate and approve the authorization request.  Because this
    // may involve multiple HTTP request/response exchanges, the transaction is
    // stored in the session.
    //
    // An application must supply serialization functions, which determine how the
    // client object is serialized into the session.  Typically this will be a
    // simple matter of serializing the client's ID, and deserializing by finding
    // the client by ID from the database.
    serializeClient() {
        this.server.serializeClient(function (client, done) {
            return done(null, client.id);
        });
        this.server.deserializeClient(function (id, done) {
            index_1.Client.findById(id).then(function (client) {
                return done(null, client);
            }, function (error) {
                return done(error);
            });
        });
    }
    // Register supported grant types.
    //
    // OAuth 2.0 specifies a framework that allows users to grant client
    // applications limited access to their protected resources.  It does this
    // through a process of the user granting access, and the client exchanging
    // the grant for an access token.
    registerGrants() {
        this.registerPasswordGrant();
        // this.registerClientCredentialGrant();
    }
    // PASSWORD GRANT TYPE
    // Exchange user id and password for access tokens.  The callback accepts the
    // `client`, which is exchanging the user's name and password from the
    // authorization request for verification. If these values are validated, the
    // application issues an access token on behalf of the user who authorized the code.
    registerPasswordGrant() {
        this.server.exchange(oauth2orize.exchange.password((athlete, username, password, scope, done) => {
            index_1.AccessToken.findOne({ where: { userId: athlete.id } }).then(accessToken => {
                if (accessToken) {
                    if (this.jwtSecret) {
                        jsonwebtoken_1.verify(accessToken.token, this.jwtSecret, (err, decodedToken) => {
                            if (err) {
                                accessToken.destroy().then(() => {
                                    if (this.jwtSecret) {
                                        jsonwebtoken_1.sign(athlete.dataValues, this.jwtSecret, { expiresIn: "10h" }, (err, encodedToken) => {
                                            if (err) {
                                                return done(err);
                                            }
                                            index_1.AccessToken.create({
                                                token: encodedToken,
                                                userId: athlete.id
                                            }).then((accessToken) => {
                                                return done(null, accessToken.token);
                                            }).catch((error) => {
                                                return done(error);
                                            });
                                        });
                                    }
                                    else {
                                        return done(new AuthError_1.AuthError("JWT Secret Undefined"), false);
                                    }
                                });
                            }
                            else if (decodedToken && accessToken.userId === decodedToken.id) {
                                return done(null, accessToken.token);
                            }
                            else {
                                return done(new AuthError_1.AuthError("Token Validation Error"), false);
                            }
                        });
                    }
                    else {
                        return done(new AuthError_1.AuthError("JWT Secret Undefined"), false);
                    }
                }
                else {
                    if (this.jwtSecret) {
                        jsonwebtoken_1.sign(athlete.dataValues, this.jwtSecret, { expiresIn: "10h" }, (err, encodedToken) => {
                            if (err) {
                                return done(err);
                            }
                            index_1.AccessToken.create({
                                token: encodedToken,
                                userId: athlete.id
                            }).then((accessToken) => {
                                return done(null, accessToken.token);
                            }).catch((error) => {
                                return done(new AuthError_1.AuthError(error.message));
                            });
                        });
                    }
                    else {
                        return done(new AuthError_1.AuthError("JWT Secret Undefined"));
                    }
                }
            });
        }));
    }
    // CLIENT CREDENTIAL GRANT TYPE
    // Exchange the client id and password/secret for an access token.  The callback accepts the
    // `client`, which is exchanging the client's id and password/secret from the
    // authorization request for verification. If these values are validated, the
    // application issues an access token on behalf of the client who authorized the code.
    registerClientCredentialGrant() {
        this.server.exchange(oauth2orize.exchange.clientCredentials(function (client, scope, done) {
            index_1.Client.findOne({
                where: { clientId: client.clientId }
            }).then(function (localClient) {
                if (localClient === null)
                    return done(null, false);
                if (localClient.clientSecret !== client.clientSecret)
                    return done(null, false);
                const token = jsonwebtoken_1.sign(localClient, this.jwtSecret, { expiresIn: "10h" });
                index_1.AccessToken.create({
                    token: token,
                    clientId: client.dataValues.id
                }).then(function (accessToken) {
                    return done(null, accessToken);
                }).catch(function (error) {
                    return done(error);
                });
            }).catch(function (error) {
                return done(error);
            });
        }));
    }
}
exports.Oauth2 = Oauth2;
//# sourceMappingURL=oauth2.js.map