import express, { Express, Request, Response } from "express";
import chalk from 'chalk'
import mongoose from "mongoose";
import 'dotenv/config'
import reqMiddleware from "./middlewares/req.middleware";
import resMiddleware from "./middlewares/res.middleware";

import routes from "./routes";
import notFoundRouter from "./routes/not-fount.router";
import constants from "./configs/constants";

const app: Express = express();
reqMiddleware(app);
resMiddleware(app.response);

app.use('/api/users', routes);
app.use(notFoundRouter);


(async () => {
  try {
    await mongoose.connect(constants.MONGO_URI)
    app.listen(constants.PORT, () => {
      console.log(`
        Database connected !!!
        Server is running on port: ${chalk.bold.blueBright(constants.PORT)}
        ENV: ${chalk.blueBright(constants.ENV)}`
      )
    });
  } catch (error) {
    console.log(chalk.bold.redBright('Database not connected!! error:', JSON.stringify(error)))
  }
})()
