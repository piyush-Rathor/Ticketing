import { Application, Response } from "express";
import chalk from "chalk";

export const logMessage = (level: 'info' | 'warning' | 'error', message: string) => {
  const logColors: { [key in 'info' | 'warning' | 'error']: (msg: string) => string } = {
    info: chalk.greenBright,
    warning: chalk.yellow,
    error: chalk.red,
  };
  // logging the response
  console.log(logColors[level](message));
};

const sendResponse = <T = unknown>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
) => {
  res.status(statusCode).send({
    message,
    data,
  })
  return Promise.resolve();
};

export default (res: Response) => {
  res.success = function <T = unknown>(message: string, data?: T) {
    logMessage('info', message);
    return sendResponse(this, 200, message, data);
  };

  res.successfullyCreated = function <T = unknown>(message: string, data: T) {
    logMessage('info', message);
    return sendResponse(this, 201, message, data);
  };

  res.validation = function <T = unknown>(message: string, data?: T) {
    logMessage('warning', message);
    return sendResponse(this, 422, message, data);
  };

  res.badRequest = function <T = unknown>(message: string, data?: T) {
    logMessage('warning', message);
    return sendResponse(this, 400, message, data);
  };

  res.error = function <T = unknown>(message: string, data?: T, statusCode: number = 500) {
    logMessage('error', message);
    return sendResponse(this, statusCode, message || "Something went wrong", data);
  };

  res.unauthorizedUser = function (message: string) {
    logMessage('error', "Unauthorized User");
    return sendResponse(this, 401, message);
  };

  res.pageNotFound = function () {
    logMessage('info', "Page Not Found");
    return sendResponse(this, 404, "Page not found");
  };
};
