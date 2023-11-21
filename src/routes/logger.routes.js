import { getFatal, getError, getWarning, getInfo, getDebug } from "../controller/loggerTest.controller.js";
import { Router } from "express";

const loggerRoutes = Router()

loggerRoutes.get("/fatal", getFatal);
loggerRoutes.get("/error", getError);
loggerRoutes.get("/warning", getWarning);
loggerRoutes.get("/info", getInfo);
loggerRoutes.get("/debug", getDebug);

export default loggerRoutes
