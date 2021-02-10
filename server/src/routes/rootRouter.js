import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import clientRouter from "./clientRouter.js";
const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);

export default rootRouter;
