import * as express from "express";
import {ClientRouter} from "./ClientRouter";
// import {AuthRouter} from "./AuthRouter";
import {userRouter} from "./UserRouter";

export class Router {

    public static initializeRoutes(app: express.Express) {
        app.use('/', new ClientRouter().router);
        // app.use('/oauth', new AuthRouter().router);
        // app.use('/users', new UserRouter().router);
    }
}
