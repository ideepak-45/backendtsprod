import { createLogger, format, transports } from "winston";
import { ConsoleTransportInstance, FileTransportInstance } from "winston/lib/winston/transports";
import util from "util";
import { config } from "../config/config";
import path from "path";
import * as sourceMapSupport from "source-map-support";

// Enable source map support for better stack traces
sourceMapSupport.install();

const consoleLogFormat = format.printf((data) => {
    const { timestamp, level, message, meta = {} } = data;
    const metaString = util.inspect(meta, { depth: null, colors: true, showHidden: false });
    return `${timestamp} [${level.toUpperCase()}]: ${message}\nMETA ${metaString}\n`;
});

const consoleTransport = (): Array<ConsoleTransportInstance> => {
    if (config.NODE_ENV === "development") {
        return [
            new transports.Console({
                level: "info",
                format: format.combine(format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), consoleLogFormat),
            }),
        ];
    }

    return [];
};

const fileLogFormat = format.printf((data) => {
    const { timestamp, level, message, meta = {} } = data;

    const logMeta: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(meta as Record<string, unknown>)) {
        if (value instanceof Error) {
            logMeta[key] = {
                name: value.name,
                message: value.message,
                stack: value.stack,
            };
        } else {
            logMeta[key] = value;
        }
    }

    const logData = {
        level: level.toUpperCase(),
        timestamp,
        message,
        meta: logMeta,
    };

    return JSON.stringify(logData, null, 4);
});

const fileTransport = (): Array<FileTransportInstance> => {
    if (config.NODE_ENV === "development") {
        return [
            new transports.File({
                filename: path.join(__dirname, `../../logs/${config.NODE_ENV}.log`),
                level: "info",
                format: format.combine(format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), fileLogFormat),
            }),
        ];
    }

    return [];
};

export const logger = createLogger({
    defaultMeta: {
        meta: {},
    },
    transports: [...fileTransport(), ...consoleTransport()],
});
