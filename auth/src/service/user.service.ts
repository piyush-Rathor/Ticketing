import * as jwt from 'jsonwebtoken'
import { IUser } from '@piyushr.webdev/common'
import bcrypt from 'bcrypt'
import constants from '../configs/constants'

export const checkIsPasswordCorrect = (password: string, hashedPassword: string): boolean => {
  return bcrypt.compareSync(password, hashedPassword)
}

export const generateJwt = (user: IUser, expiresInSec: number = 600): string => {
  const newUser = {
    email: user.email,
    id: user.id,
    isActive: user.isActive,
  }
  return jwt.sign(newUser, constants.JWT_KEY, { expiresIn: expiresInSec })
}
