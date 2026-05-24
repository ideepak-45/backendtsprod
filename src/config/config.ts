import dotenvFlow from "dotenv-flow";

dotenvFlow.config();

export const config = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || "development",
    SERVER_URL: process.env.SERVER_URL || `http://localhost:${process.env.PORT || 3000}`,
    DATABASE_URL: process.env.DATABASE_URL || "mongodb://localhost:27017/your_db_name",
};
