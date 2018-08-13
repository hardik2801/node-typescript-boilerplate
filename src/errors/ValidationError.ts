import {BaseError} from "./BaseError";

export class ValidationError extends BaseError {
    constructor(errorString: string, code: number, name: string) {
        super(errorString, code, name);
    }
}