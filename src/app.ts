import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";
import router from "./router/apiRouter";
import globalErrorHandler from "./middleware/globalErrorHandler";
import httpError from "./util/httpError";
import responseMessage from "./constant/responseMessage";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../", "public")));

// Routes
app.use("/api", router);

// 404 Handler
app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND("route"));
    } catch (error) {
        httpError(next, req, error, 404);
    }
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
