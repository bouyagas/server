import * as mongoose from 'mongoose';

const PostSchema: mongoose.Schema<any> = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export const Post: mongoose.Model<mongoose.Document> = mongoose.model('post', PostSchema);
