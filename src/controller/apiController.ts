import { NextFunction, Request, Response } from "express";
import httpResponse from "../util/httpResponse";
import responseMessage from "../constant/responseMessage";
import httpError from "../util/httpError";
import { logger } from "../util/logger";

export default {
    self: (req: Request, res: Response, next: NextFunction) => {
        try {
            httpResponse(req, res, 200, responseMessage.SUCCESS, { info: "API is working fine." });
        } catch (error) {
            logger.error(`API CONTROLLER ERROR`, { meta: { endpoint: "/self" }, error });
            httpError(next, req, error, 500);
        }
    },
};
