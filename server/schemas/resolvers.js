// import user model
const { User, Book } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, args) => {
      return await User.find({ _id: args.id });
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      return await User.create(args);
    },
    login: async (parent, args) => {
      const user = await User.findOne({ $or: [{ username: args.username }, { email: args.email }] });

      if (!user) {
        throw new AuthenticationError('No user found!');
      }

      const correctPw = await user.isCorrectPassword(args.password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, profile };
    },
    saveBook: async (parent, args) => {
      return await User.findOneAndUpdate(
        { _id: args.id },
        { $addToSet: { savedBooks: args } },
        { new: true, runValidators: true }
      );
    },
    removeBook: async (parent, args) => {
      return await User.findOneAndUpdate(
        { _id: args.id },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;