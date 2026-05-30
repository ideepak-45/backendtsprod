import { Request } from "express";
import { config } from "../config/config";
import { EApplicationEnvironment } from "../constant/application";
import responseMessage from "../constant/responseMessage";
import { THttpError } from "../types/types";
import { logger } from "./logger";

export default (err: Error | unknown, req: Request, errorStatusCode: number = 500): THttpError => {
    const errorObject: THttpError = {
        success: false,
        statusCode: errorStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl,
        },
        message: err instanceof Error ? err.message || responseMessage.SOME_ERROR_OCCURRED : responseMessage.SOME_ERROR_OCCURRED,
        data: null,
        trace: err instanceof Error ? { name: err.name, stack: err.stack } : null,
    };

    // log
    logger.error(`HTTP ERROR`, { meta: { endpoint: req.originalUrl }, error: errorObject });

    // production Environment: remove ip from response
    if (config.NODE_ENV === EApplicationEnvironment.PRODUCTION) {
        delete errorObject.request.ip;
        delete errorObject.trace;
    }

    return errorObject;
};
