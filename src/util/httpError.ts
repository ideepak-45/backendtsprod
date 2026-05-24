import { NextFunction, Request } from "express";
import { THttpError } from "../types/types";
import errorObject from "./errorObject";

export default (nextFunc: NextFunction, req: Request, err: Error | unknown, errorStatusCode: number = 500): void => {
    const errorResponse: THttpError = errorObject(err, req, errorStatusCode);
    return nextFunc(errorResponse);
};
