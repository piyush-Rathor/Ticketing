import * as express from "express";
// import { IUserWithId } from "../models/user.model";

declare global {
    namespace Express {
        export interface Request<B = any, Q = any, P = any, IUserWithId = any> {
            user?: IUserWithId
            body: B
            query: Q;
            params: P;
        }
        export interface Response {
            success: <T = unknown>(message: string, data?: T) => Promise<void>;
            successfullyCreated: <T = unknown>(message: string, data: T) => Promise<void>;
            validation: <T = unknown>(message: string, data?: T) => Promise<void>;
            badRequest: <T = unknown>(message: string, data?: T) => Promise<void>;
            error: <T = unknown>(message: string, data?: T, statusCode?: number) => Promise<void>;
            unauthorizedUser: (message: string) => Promise<void>;
            pageNotFound: () => Promise<void>;
        }
    }
}

