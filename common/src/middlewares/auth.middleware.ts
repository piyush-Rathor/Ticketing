import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { COMMON_CONSTANTS } from '../configs'
import { COMMON_MESSAGES } from '../configs'
import { findUserWithId } from '../service'
import { IUserWithId } from '../models'

interface RequestExt extends Request {
  user?: IUserWithId
}

interface ResponseExt extends Response {
  success: <T = unknown>(message: string, data?: T) => Promise<void>
  successfullyCreated: <T = unknown>(message: string, data: T) => Promise<void>
  validation: <T = unknown>(message: string, data?: T) => Promise<void>
  badRequest: <T = unknown>(message: string, data?: T) => Promise<void>
  error: <T = unknown>(message: string, data?: T, statusCode?: number) => Promise<void>
  unauthorizedUser: (message: string) => Promise<void>
  pageNotFound: () => Promise<void>
}

export const checkToken = async <Req extends RequestExt, Res extends ResponseExt, Next extends NextFunction>(req: Req, res: Res, next: Next) => {
  try {
    const token = req.headers?.['authorization']?.split(' ')?.at(1)
    if (!token) return res.unauthorizedUser(COMMON_MESSAGES.ERRORS.NO_TOKEN)
    const decoded = await jwt.verify(token, COMMON_CONSTANTS.JWT_KEY)
    if (!decoded || typeof decoded === 'string') return res.unauthorizedUser(COMMON_MESSAGES.ERRORS.NOT_VALID)
    req.user = (await findUserWithId(decoded.id as string)) as IUserWithId
    if (!req.user.isActive) return res.unauthorizedUser(COMMON_MESSAGES.ERRORS.NOT_VALID)
    next()
  } catch (err) {
    return res.unauthorizedUser(COMMON_MESSAGES.ERRORS.NOT_VALID)
  }
}
