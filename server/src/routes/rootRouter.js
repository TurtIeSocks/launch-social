import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import clientRouter from "./clientRouter.js";
import eventsRouter from './api/v1/eventsRouter.js' 
import basicsRouter from './api/v1/basicsRouter.js' 
import gamesRouter from './api/v1/gamesRouter.js' 

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/events", eventsRouter)
rootRouter.use("/api/v1/basics", basicsRouter)
rootRouter.use("/api/v1/games", gamesRouter)

export default rootRouter;
