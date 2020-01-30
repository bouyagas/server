"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
    user: {
        ref: 'user',
        required: true,
        type: mongoose.Schema.Types.ObjectId,
    },
    username: {
        type: String,
    },
    text: {
        required: true,
        type: String,
    },
    avatar: {
        type: String,
    },
    comments: [
        {
            user: {
                ref: 'user',
                type: mongoose.Schema.Types.ObjectId,
            },
            username: {
                type: String,
            },
            text: {
                required: true,
                type: String,
            },
            avatar: {
                type: String,
            },
            date: {
                default: Date.now,
                type: Date,
            },
        },
    ],
}, { timestamps: true });
exports.Post = mongoose.model('post', PostSchema);
//# sourceMappingURL=post.model.js.map