import { User, IUser, IUserWithId } from '../models/user.model'

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
export const createUser = async <UserSignupDTO>(data: UserSignupDTO): Promise<IUserWithId> => {
  const newUser = new User(data)
  return await newUser.saveUser()
}
