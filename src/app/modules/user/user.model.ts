import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// pre hook

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // has password
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set "" after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
// check if user exist in user model using statics methods
userSchema.statics.isUserExistByCustomId = async function (id: string) {
  return await userModel.findOne({ id });
};

// compare password using statics methods
userSchema.statics.isPasswordMatched = async function (
  planTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(planTextPassword, hashedPassword);
};
// statics method for is user already deleted
userSchema.statics.isUserDeleted = async function (isDeleted) {
  return isDeleted;
};
// checking user status
userSchema.statics.userBlock = function (status) {
  if (status === 'blocked') {
    return true;
  }
  return false;
};

export const userModel = model<TUser, UserModel>('user', userSchema);
