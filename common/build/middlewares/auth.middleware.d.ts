import { Request, Response, NextFunction } from 'express';
import { IUserWithId } from '../models';
interface RequestExt extends Request {
    user?: IUserWithId;
}
interface ResponseExt extends Response {
    success: <T = unknown>(message: string, data?: T) => Promise<void>;
    successfullyCreated: <T = unknown>(message: string, data: T) => Promise<void>;
    validation: <T = unknown>(message: string, data?: T) => Promise<void>;
    badRequest: <T = unknown>(message: string, data?: T) => Promise<void>;
    error: <T = unknown>(message: string, data?: T, statusCode?: number) => Promise<void>;
    unauthorizedUser: (message: string) => Promise<void>;
    pageNotFound: () => Promise<void>;
}
export declare const checkToken: <Req extends RequestExt, Res extends ResponseExt, Next extends NextFunction>(req: Req, res: Res, next: Next) => Promise<void>;
export {};
