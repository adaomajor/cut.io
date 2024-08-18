import mongoose, { Schema, Document, Model} from 'mongoose'
import bcrypt from 'bcryptjs';

interface CUser extends Document {
    username: string;
    email: string;
    password: string;
    created?: Date;
    compare(pass: string): Promise<boolean>
}

const userSchema: Schema<CUser> = new Schema<CUser>({
    username: { type: String, required: true, minlength:6},
    email: { type: String, required: true, minlength: 8},
    password: { type: String, required: true, select: false},
    created: { type: Date, default: Date.now },
})

userSchema.pre('save',
    async function(next){
        const user = this as CUser
        if (!user.isModified('password')) return next();
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(user.password, salt)
        user.password = hashedPassword
        next()
    }
)

userSchema.methods.compare = function(pass: string): Promise<boolean> {
    const user = this as CUser;
    return new Promise((resolve, reject) => {
        bcrypt.compare(pass, user.password, (err, isMatch) => {
            if (err) {
                return reject(err);
            }
            resolve(isMatch);
        });
    });
};

const userModel: Model<CUser> = mongoose.model<CUser>('Users', userSchema)
export default userModel
