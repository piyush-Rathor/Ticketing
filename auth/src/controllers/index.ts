import { NextFunction, Request, Response, RequestHandler } from 'express'
import { findActiveUserWithEmailIncludePassword, findUserWithEmail, createUser } from '@piyushr.webdev/common'
import * as userService from '../service/user.service'
import MESSAGES from '../configs/res'
import { UserSignInDTO } from '../utils/validations/sign-in'
import { UserSignupDTO } from '../utils/validations/sign-up'

export const signInController: RequestHandler = async ({ body }: { body: UserSignInDTO }, res: Response, next: NextFunction) => {
  try {
    const user = await findActiveUserWithEmailIncludePassword(body.email)
    if (!user) return res.validation(MESSAGES.ERRORS.USR_NOT_EXIST)
    if (!userService.checkIsPasswordCorrect(body.password, user.password)) return res.validation(MESSAGES.ERRORS.PASS_INCORRECT)
    return res.success(MESSAGES.SUC.LOG_IN, { token: userService.generateJwt(user), id: user.id })
  } catch (error) {
    return res.error('Something went wrong!', error)
  }
}

export const signUpController: RequestHandler = async ({ body }: { body: UserSignupDTO }, res: Response, next: NextFunction) => {
  try {
    const alreadyUserExist = await findUserWithEmail(body.email)
    if (alreadyUserExist) return res.validation(MESSAGES.ERRORS.USR_EXIST)
    const user = await createUser(body)
    return res.success(MESSAGES.SUC.SIGN_UP, user)
  } catch (error) {
    return res.error('Something went wrong!', error)
  }
}

export const userDetailsController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.success(MESSAGES.SUC.USER_DETAILS, req.user)
  } catch (error) {
    return res.error('Something went wrong!', error)
  }
}
