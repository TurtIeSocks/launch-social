import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import clientRouter from "./clientRouter.js";
import eventsRouter from './api/v1/eventsRouter.js' 
const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/events", eventsRouter)

export default rootRouter;
