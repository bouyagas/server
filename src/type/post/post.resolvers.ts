import { AuthenticationError } from 'apollo-server';
import { checkAuth } from '../../utils/auth';
import { User } from '../user/user.model';
import { Post } from './post.model';

export const postsResolvers = {
  Query: {
    post: async (_: any, { id }: any, ___: any): Promise<any> => {
      try {
        const post: any = await Post.findById({ _id: id });
        return post;
      } catch (err) {
        console.error(err.message);
        throw new AuthenticationError(err.message);
      }
    },

    posts: async (_: any, __: any, context: any): Promise<any> => {
      try {
        const user: any = checkAuth(context);
        const posts: any = await Post.find({ user: user.id })
          .sort({ created_at: -1 })
          .exec();
        return posts;
      } catch (err) {
        console.error(err.message);
        throw new AuthenticationError(err.message);
      }
    },
  },
  // tslint:disable-next-line: object-literal-sort-keys
  Mutation: {
    newComment: async (_: any, { input }: any, context: any): Promise<any> => {
      try {
        const usertoken: any = checkAuth(context);
        const user: any = await User.findById(usertoken.id).select('-password');
        const post: any = await Post.findOne({ user: user.id });

        const newComment = {
          avatar: user.avatar,
          text: input.text,
          user: usertoken.id,
          username: user.username,
        };

        post.comments.unshift(newComment);
        await post.save();
        return post;
      } catch (err) {
        console.error(err.message);
        throw new AuthenticationError(err.message);
      }
    },

    newPost: async (_: any, { input }: any, context: any): Promise<any> => {
      try {
        const usertoken: any = checkAuth(context);
        console.log(usertoken.username);
        const user: any = await User.findById(usertoken.id).select('-password');
        const createPost: any = new Post({
          avatar: user.avatar,
          text: input.text,
          user: usertoken.id,
          username: user.username,
        });

        const newPost = await createPost.save();

        return newPost;
      } catch (err) {
        console.error(err.message);
        throw new AuthenticationError(err.message);
      }
    },

    removePost: async (_: any, { id }: any, context: any): Promise<void> => {
      try {
        const user: any = checkAuth(context);
        const post: any = await Post.findByIdAndRemove({ id, user: user.id });

        if (!post) {
          throw new AuthenticationError('Post not found');
        }

        if (post.user.toString() !== user.id) {
          throw new AuthenticationError('User not authorized');
        }
        return await post;
      } catch (err) {
        console.error(err.message);
        throw new AuthenticationError(err.message);
      }
    },
  },
};
