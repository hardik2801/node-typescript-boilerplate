import * as express from "express";
import {userRules} from "../auth/user.rules";
import {validationResult} from "express-validator/check";
import {matchedData} from "express-validator/filter";
import {UserAddModel} from "../models/entities/User";
import {UserService} from "../services/user.service";

export class ClientRouter {

    public router: express.Router;
    // private clientManager: ClientManager;

    constructor() {
        // this.clientManager = new ClientManager();
        this.router = express.Router();
        this.buildRoutes();
    }

    public async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            // res.json(clients);
            res.send('hello');
        } catch(error) {
            next(error);
        }
    }

    private buildRoutes() {
        this.router.get("/", this.get.bind(this));
        // this.router.get("/test",)

        this.router.post("/register", userRules['forRegister'], (req, res) => {
            const errors = validationResult(req);

            if (!errors.isEmpty())
                return res.status(422).json(errors.array());

            const payload = matchedData(req) as UserAddModel;
            const user = new UserService().register(payload);

            return user.then(u => {
                res.json(u);
            });
        });



    }
}