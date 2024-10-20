import mongoose, { Document, ObjectId } from 'mongoose';
export interface IUser extends Document {
    _id: ObjectId;
    email: string;
    password: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    isActive: boolean;
}
interface IUserMethods {
    saveUser(): Promise<IUserWithId>;
}
export type IUserWithId = Omit<IUser, '_id' | 'password'> & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
};
export declare const User: mongoose.Model<IUser & IUserMethods, {}, {}, {}, mongoose.Document<unknown, {}, IUser & IUserMethods> & IUser & IUserMethods & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}> & {
    __v?: number;
}, any>;
export {};
