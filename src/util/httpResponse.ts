import { Request, Response } from "express";
import { THttpResponse } from "../types/types";
import { config } from "../config/config";
import { EApplicationEnvironment } from "../constant/application";

export default (req: Request, res: Response, responseStatusCode: number, responseMessage: string, data: unknown = null): void => {
    const response: THttpResponse = {
        success: responseStatusCode >= 200 && responseStatusCode < 300,
        statusCode: responseStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl,
        },
        message: responseMessage,
        data: data,
    };

    // log
    console.log(`HTTP RESPONSE { meta: { endpoint: ${req.originalUrl} } response: ${JSON.stringify(response)} }`);

    // production Environment: remove ip from response
    if (config.NODE_ENV === EApplicationEnvironment.PRODUCTION) {
        delete response.request.ip;
    }

    res.status(responseStatusCode).json(response);
};
