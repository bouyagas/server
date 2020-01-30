"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
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
}, { timestamps: true });
userSchema.pre('save', function preSave(next) {
    if (!this.isModified('password')) {
        next();
    }
    else {
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
userSchema.method('comparePassword', function comparePassword(candidate) {
    if (!this.password) {
        throw new Error('User has not been configured with a password.');
    }
    if (!candidate) {
        return false;
    }
    return bcrypt.compare(candidate, this.password);
});
exports.User = mongoose.model('user', userSchema);
//# sourceMappingURL=user.model.js.map