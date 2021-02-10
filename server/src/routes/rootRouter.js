import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import clientRouter from "./clientRouter.js";
import eventsRouter from './api/v1/eventsRouter.js' 
import basicsRouter from './api/v1/basicsRouter.js' 

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/events", eventsRouter)
rootRouter.use("/api/v1/basics", basicsRouter)

export default rootRouter;
