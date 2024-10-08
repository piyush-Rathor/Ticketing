import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import constants from "../configs/constants";
import MESSAGES from '../configs/res'
import { findUserWithId } from "../service/user.service";
import { IUserWithId } from "../models/user.model";

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers?.['authorization']?.split(' ')?.at(1);
    if (!token) return res.unauthorizedUser(MESSAGES.ERRORS.NO_TOKEN)
    jwt.verify(token, constants.JWT_KEY, async (err, decoded) => {
        if (err) return res.unauthorizedUser(MESSAGES.ERRORS.NOT_VALID);
        if (!decoded || typeof decoded === 'string') return res.unauthorizedUser(MESSAGES.ERRORS.NOT_VALID);
        req.user = await findUserWithId(decoded.id as string) as IUserWithId
        if (!req.user.isActive) return res.unauthorizedUser(MESSAGES.ERRORS.NOT_VALID);
        next();
    });
};

export default checkToken;