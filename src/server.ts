import app from "./app";
import { config } from "./config/config";

const server = app.listen(config.PORT);

(() => {
    try {
        console.log(`APPLICATION STARTED { meta: { PORT: ${config.PORT}, SERVER_URL: ${config.SERVER_URL} } }`);
    } catch (error) {
        console.error(`APPLICATION ERROR { meta: { PORT: ${config.PORT}, SERVER_URL: ${config.SERVER_URL} } error: ${error} }`);

        server.close((error) => {
            if (error) {
                console.error(`APPLICATION CLOSING ERROR { meta: { PORT: ${config.PORT}, SERVER_URL: ${config.SERVER_URL} } error: ${error} }`);
            }

            process.exit(1);
        });
    }
})();

export default server;
