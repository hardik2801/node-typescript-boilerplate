import {RegistrationError} from "./RegistrationError";
import {AuthError} from "./AuthError";
import {DatabaseError} from "./DatabaseError";
import {NotFoundError} from "./NotFoundError";
import {DatabaseError as SequelizeError, ValidationError as SequelizeValidationError} from "sequelize";
import {InternalServerError} from "./InternalServerError";
import {ValidationError} from "./ValidationError";

export function errorHandler(error, req, res, next) {

    if (error instanceof RegistrationError) {
        return res.status(400).json(error);
    }
    if (error instanceof AuthError) {
        return res.status(401).json(error);
    }
    if (error.name === 'AuthenticationError') {
        return res.status(403).json(error);
    }
    if (error instanceof DatabaseError) {
        return res.status(500).json(error);
    }
    if (error instanceof SequelizeError) {
        return res.status(500).json(new DatabaseError(error.message));
    }
    if (error instanceof NotFoundError) {
        return res.status(404).json(error);
    }
    if (error instanceof SequelizeValidationError) {
        return res.status(400).json(new ValidationError(error.message));
    }
    return res.status(500).json(new InternalServerError(error.message));
}
