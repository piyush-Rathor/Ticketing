import * as express from "express";

declare global {
  declare namespace Express {
    export interface Request {
      token?: string
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

