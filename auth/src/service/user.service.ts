import * as jwt from "jsonwebtoken";
import User, { IUser, IUserWithId } from "../models/user.model";
import { UserSignupDTO } from "../utils/validations/sign-up";
import bcrypt from 'bcrypt'
import constants from "../configs/constants";

export const findActiveUserWithEmailIncludePassword = async (email: string): Promise<IUser | null> => {
    return await User.findOne({ email, isActive: true })
}

export const findUserWithEmail = async (email: string): Promise<IUser | null> => {
    return await User.findOne({ email }).select({ password: 0 })
}

export const findUserWithId = async (id: string): Promise<IUserWithId | undefined> => {
    const user = await User.findById(id)
    return user?.toJSON() as IUserWithId | undefined
}
export const createUser = async (data: UserSignupDTO): Promise<IUserWithId> => {
    const newUser = new User(data);
    return await newUser.saveUser();
};

export const checkIsPasswordCorrect = (password: string, hashedPassword: string): boolean => {
    return bcrypt.compareSync(password, hashedPassword)
}

export const generateJwt = (user: IUser, expiresInSec: number = 600): string => {
    const newUser = {
        email: user.email,
        id: user.id,
        isActive: user.isActive
    }
    return jwt.sign(newUser, constants.JWT_KEY, { expiresIn: expiresInSec })
}