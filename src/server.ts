import * as express from "express";
import * as compression from "compression";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import * as config from "./config/config";
import * as http from "http";
import * as cors from 'cors';
import { userRouter } from './routes/UserRouter';
import { tokenGuard } from './middlewares/token.guard';
// import {Auth} from "./auth/auth";
import {Router} from "./routes/index";
import {errorHandler} from "./errors/ErrorHandler";
import {InternalServerError} from "./errors/InternalServerError";

export class Server {

    public static app: express.Express;

    // TODO Make all of this async
    constructor() {}

    public static async initializeApp(): Promise<http.Server> {
        try {
            require('dotenv').config();

            Server.app = express();

            // Configure application
            Server.configureApp();

            // Initialize OAuth
          //  Server.initializeAuth();

            // Initialize Routes
            Router.initializeRoutes(Server.app);
            // Server.app.use(tokenGuard());

            // Initialize RabbitMQ Connection
            /*amqplib.connect('amqp://localhost').then(connection => {
                MessageManager.connection = connection;
            }, () => {
                logger.error("Could not initialize RabbitMQ Server");
                throw new InternalServerError("Cannot connect to RabbitMQ Server");
            });*/

            Server.app.use(errorHandler);

            process.on('unhandledRejection', (reason, p) => {
                console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
            });

            // Initialize Database then bootstrap application
            try {
                await Server.initializeDatabase();
            } catch(error) {
                console.log("Failed to initialize database", error);
            }

            return Server.app.listen(Server.app.get("port"));
            
        } catch(error) {
            throw new InternalServerError(error.message);
        }

    }

    private static initializeDatabase() {
        const nodeEnv = process.env.NODE_ENV;
        if(nodeEnv) {
            const sequelizeConfig = config[nodeEnv];
            // const models = new Models(sequelizeConfig);
            // return models.initModels();
        } else {
            throw new InternalServerError("No NODE ENV set");
        }
    }

    private static initializeAuth() {
        Server.app.use(passport.initialize());
        // Auth.serializeUser();
        // Auth.useBasicStrategy();
        // Auth.useBearerStrategy();
        // Auth.useLocalStrategy();
        // Auth.useFacebookTokenStrategy();
    }
    private static configureApp() {
        // all environments
        Server.app.set("port", process.env.PORT || 3000);
        Server.app.use(cors());
        Server.app.use(bodyParser.urlencoded({ extended: true }));
        Server.app.use(bodyParser.json());
        Server.app.use(compression());
    }
}