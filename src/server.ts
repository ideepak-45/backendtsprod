import app from "./app";
import { config } from "./config/config";
import { logger } from "./util/logger";
import mongooseService from "./service/database/mongooseService";

const server = app.listen(config.PORT);

(async () => {
    try {
        const mongooseConnection = await mongooseService.connect();
        logger.info(`Connected to MongoDB`, {
            meta: { host: mongooseConnection.host, port: mongooseConnection.port, name: mongooseConnection.name },
        });

        logger.info(`APPLICATION STARTED`, { meta: { PORT: config.PORT, SERVER_URL: config.SERVER_URL } });
    } catch (error) {
        logger.error(`APPLICATION ERROR`, { meta: error });
        server.close((error) => {
            if (error) {
                logger.error(`APPLICATION CLOSING ERROR`, { meta: error });
            }

            process.exit(1);
        });
    }
})();

export default server;
