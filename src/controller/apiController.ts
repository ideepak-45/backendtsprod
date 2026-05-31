import { NextFunction, Request, Response } from "express";
import httpResponse from "../util/httpResponse";
import responseMessage from "../constant/responseMessage";
import httpError from "../util/httpError";
import { logger } from "../util/logger";
import quicker from "../util/quicker";
import mongoose from "mongoose";

export default {
    self: (req: Request, res: Response, next: NextFunction) => {
        try {
            httpResponse(req, res, 200, responseMessage.SUCCESS, { info: "API is working fine." });
        } catch (error) {
            logger.error(`API CONTROLLER ERROR`, { meta: { endpoint: "/self" }, error });
            httpError(next, req, error, 500);
        }
    },
    health: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const healthData = await quicker.getHealth(mongoose.connection);
            httpResponse(req, res, 200, responseMessage.SUCCESS, healthData);
        } catch (error) {
            logger.error(`API CONTROLLER ERROR`, { meta: { endpoint: "/health" }, error });
            httpError(next, req, error, 500);
        }
    },
};
