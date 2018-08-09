import * as express from "express";
import {ClientManager} from "../managers/ClientManager";

export class ClientRouter {

    public router: express.Router;
    private clientManager: ClientManager;

    constructor() {
        this.clientManager = new ClientManager();
        this.router = express.Router();
        this.buildRoutes();
    }

    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            // res.json(clients);
        } catch(error) {
            next(error);
        }
    }

    private buildRoutes() {
        this.router.get("/", this.get.bind(this));
    }
}