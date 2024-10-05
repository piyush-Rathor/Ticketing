import express, { Express, Request, Response } from "express";
import chalk from 'chalk'
import 'dotenv/config'
import reqMiddleware from "./middlewares/req.middleware";
import resMiddleware from "./middlewares/res.middleware";

import routes from "./routes";
import notFoundRouter from "./routes/not-fount.router";
import constants from "./configs/constants";

const app: Express = express();
reqMiddleware(app);
resMiddleware(app.response);

app.use('/api', (req,res)=>{
  return res.success('')
});
app.use('/api/users', routes);
app.use(notFoundRouter);

app.listen(constants.PORT, () => {
  console.log(`
    Server is running on port: ${chalk.bold.blueBright(constants.PORT)}
    ENV: ${chalk.blueBright(constants.ENV)}`
  )
});