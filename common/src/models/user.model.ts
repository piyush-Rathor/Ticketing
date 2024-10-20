import mongoose, { Document, ObjectId } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
  _id: ObjectId
  email: string
  password: string
  createdAt: NativeDate
  updatedAt: NativeDate
  isActive: boolean
}

interface IUserMethods {
  saveUser(): Promise<IUserWithId>
}

export type IUserWithId = Omit<IUser, '_id' | 'password'> & {
  id: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    const { _id, password, ...rest } = ret
    return {
      id: _id.toString(),
      ...rest,
    } as IUserWithId
  },
})

userSchema.methods.saveUser = async function (): Promise<IUserWithId> {
  if (this.isModified('password')) this.password = bcrypt.hashSync(this.password, 10)
  const savedUser = await this.save()
  return savedUser.toJSON() as IUserWithId
}

export const User = mongoose.model<IUser, mongoose.Model<IUser & IUserMethods>>('User', userSchema)
