import { IUser, IUserWithId } from '../models/user.model';
export declare const findActiveUserWithEmailIncludePassword: (email: string) => Promise<IUser | null>;
export declare const findUserWithEmail: (email: string) => Promise<IUser | null>;
export declare const findUserWithId: (id: string) => Promise<IUserWithId | undefined>;
export declare const createUser: <UserSignupDTO>(data: UserSignupDTO) => Promise<IUserWithId>;
