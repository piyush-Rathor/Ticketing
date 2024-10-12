import express, { Express, Request, Response } from "express";

import 'dotenv/config'
import validateEnvVariables from "./utils/config";
import reqMiddleware from "./middlewares/req.middleware";
import resMiddleware from "./middlewares/res.middleware";

import routes from "./routes";
import notFoundRouter from "./routes/not-fount.router";

const app: Express = express();
reqMiddleware(app);
resMiddleware(app.response);
validateEnvVariables()

app.use('/api/users', routes);
app.use(notFoundRouter);

export default app