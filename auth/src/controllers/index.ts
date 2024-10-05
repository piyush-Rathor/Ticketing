import { NextFunction, Request, Response, RequestHandler } from "express";

export const signInController: RequestHandler = (req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        return res.success('Login Successfully')
    } catch (error) {
        return res.error('Login Successfully')
    }
}

export const signUpController: RequestHandler = (req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        return res.success('SignUp Successfully')
    } catch (error) {
        return res.error('SignUp Successfully')
    }
}

export const signOutController: RequestHandler = (req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        return res.success('SignOut Successfully')
    } catch (error) {
        return res.error('SignOut Successfully')
    }
}

export const userDetailsController: RequestHandler = (req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        return res.success('user-details Successfully')
    } catch (error) {
        return res.error('user-details Successfully')
    }
}
