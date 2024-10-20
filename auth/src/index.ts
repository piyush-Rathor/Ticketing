import app from "./app";
import chalk from "chalk";
import mongoose from "mongoose";
import constants from "./configs/constants";

(async () => {
  try {
    await mongoose.connect(constants.MONGO_URI);
    app.listen(constants.PORT, () => {
      console.log(`
        Database connected !!!
        Server is running on port: ${chalk.bold.blueBright(constants.PORT)}
        ENV: ${chalk.blueBright(constants.ENV)}`);
    });
  } catch (error) {
    console.log(
      chalk.bold.redBright(
        "Database not connected!! error:",
        JSON.stringify(error)
      )
    );
  }
})();
