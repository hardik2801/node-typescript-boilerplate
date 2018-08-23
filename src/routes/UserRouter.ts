import * as express from "express";
import {User} from "../models";
import {UserManager} from "../managers/UserManager";
import {Auth} from "../auth/auth";
import {UserDTO} from "../models/dtos/UserDTO";
import {Roles} from "../auth/roles";
import {BaseRouter} from "./BaseRouter";
import {AuthError} from "../errors/AuthError";
import {sign, verify} from "jsonwebtoken";
import * as YapsodyAuth from "yap-auth-client/index.js";

export class UserRouter extends BaseRouter {

    private userManager: UserManager;
    private jwtSecret: string = process.env.JWT_SECRET || 'Yapsody_auth';
    
    constructor() {
        super();
        this.userManager = new UserManager();
        this.buildRoutes();
    }

    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            if (req.query.email) {
                const user = await this.userManager.findByEmail(req.query.email);
                res.json(new UserDTO(user));
            } else {
                const users = await User.findAll<User>();
                const userDTOs = users.map(user => {
                    return new UserDTO(user);
                });
                res.json(userDTOs);
            }
        } catch (error) {
            next(error);
        }
    }

    public async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const user = await this.userManager.createUser(req.body.email, req.body.password, req.body.firstName, req.body.lastName);
            res.json(new UserDTO(user));
        } catch (error) {
            next(error);
        }
    }

    public async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const user = await this.userManager.updateUser(req.params.id, req.body.email, req.body.firstName, req.body.lastName, req.body.role);
            res.json(new UserDTO(user));
        } catch (error) {
            next(error);
        }
    }

    public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const user = await this.userManager.deleteUser(req.params.id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    public async getByToken(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            res.json(new UserDTO(req.user));
        } catch (error) {
            next(error);
        }
    }

    public async changePassword(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const user = await this.userManager.updatePassword(req.params.id, req.body.currentPassword, req.body.newPassword);
            res.json(new UserDTO(user));
        } catch (error) {
            next(error);
        }
    }

    public async getAccessToken(req: express.Request, res: express.Response, next: express.NextFunction) {
        try{
            const newUser = await YapsodyAuth.verifyUser(req);
            res.send(newUser);
        } catch(error) {
            res.status(error.code).send(error.message);
        }
    }

    public async verifyAccessToken(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log('coming here!');
        try {
            const data = await YapsodyAuth.verifyUser(req);
            res.send(data);
        } catch (error) {
            res.status(error.code).send(error.message);
            console.log(error, 'err user route');
        }
    }

    public async registerUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        try{
            const newUser = await YapsodyAuth.registerUser(req);
            res.send(newUser);
        } catch(error) {
            res.status(error.code).send(error.message);
        }
    }


    private buildRoutes() {
        this.router.post("/login", this.getAccessToken.bind(this));
        this.router.post("/verify", this.verifyAccessToken.bind(this));
        this.router.post("/registeruser", this.registerUser.bind(this));
        this.router.post("/", this.post.bind(this));
        this.router.delete("/:id", Auth.getBearerMiddleware(), Roles.connectRoles.can('modify user'), this.delete.bind(this));
        this.router.put("/:id", Auth.getBearerMiddleware(), Roles.connectRoles.can('modify user'), this.put.bind(this));
        this.router.get("/current", Auth.getBearerMiddleware(), this.getByToken.bind(this));
        this.router.put("/:id/password",  Auth.getBearerMiddleware(), Roles.connectRoles.can('modify user'), this.changePassword.bind(this));
    }
}