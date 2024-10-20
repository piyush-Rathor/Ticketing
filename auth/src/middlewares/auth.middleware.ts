import { Request, Response, NextFunction } from 'express'
import { checkToken } from '@piyushr.webdev/common'

export const isValid = (req: Request, res: Response, next: NextFunction) => checkToken(req, res, next)
