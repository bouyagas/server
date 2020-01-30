import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';

const userSchema: mongoose.Schema<any> = new mongoose.Schema(
  {
    username: {
      required: true,
      type: String,
    },

    email: {
      required: true,
      trim: true,
      type: String,
      unique: true,
    },

    password: {
      required: true,
      type: String,
    },

    avatar: {
      type: String,
    },
  },

  { timestamps: true }
);

userSchema.pre('save', function preSave(this: any, next: () => {}) {
  if (!this.isModified('password')) {
    next();
  } else {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(this.password, salt))
      .then(hash => {
        this.password = hash;
        next();
      })
      .catch(next);
  }
});

userSchema.method('comparePassword', function comparePassword(this: any, candidate: string) {
  if (!this.password) {
    throw new Error('User has not been configured with a password.');
  }
  if (!candidate) {
    return false;
  }
  return bcrypt.compare(candidate, this.password);
});

export const User: mongoose.Model<mongoose.Document, {}> = mongoose.model('user', userSchema);
