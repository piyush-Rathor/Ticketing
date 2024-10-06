import mongoose, { Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
    _id: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    isActive: boolean;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /.+\@.+\..+/
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});


// Middleware to hash the password before saving the user
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    this.updatedAt = new Date();
    next();
});

// Method to convert _id to id
userSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id; // Rename _id to id
        delete ret._id; // Remove _id from the output
        delete ret.__v; // Optionally remove __v (version key)
        return ret;
    }
});

// Create the User model
const User = mongoose.model('User', userSchema);

export default User;