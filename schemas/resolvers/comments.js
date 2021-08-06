const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/auth');

module.exports = { Mutation: {
    async createComment(_, { postId, body }, context) {
        const { username } = checkAuth(context);
        // make sure the comment isn't empty
        if (body.trim() === '') {
          throw new UserInputError('Comment is empty', {
            errors: {
              body: 'Comment body cannot be empty',
            },
          });
        }
  
        const post = await Post.findById(postId);
        if (post) {
          post.comments.unshift({
            body,
            username,
            createdAt: new Date().toISOString(),
          });
          await post.save();
          return post;
        }
        // post doesn't exist
        throw new UserInputError('Post cannot be found');
      },
      async deleteComment(_, { postId, commentId }, context) {
        // make sure user is logged in and grab their username
        const { username } = checkAuth(context);
  
        const post = await Post.findById(postId);
  
        if (post) {
          const commentIndex = post.comments.findIndex((cIndex) => cIndex.id === commentId);
  
          // make sure the comment belongs to the user who's trying to delete it
          if (post.comments[commentIndex].username === username) {
            post.comments.splice(commentIndex, 1);
            await post.save();
            return post;
          }
          // it's NOT the owner of the post
          throw new AuthenticationError('Action is not allowed');
        }
        // post doesn't exist
        throw new UserInputError('Post cannot be found');
      },
    },
};