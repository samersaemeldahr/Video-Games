const { AuthenticationError } = require('apollo-server-express');
const { User, Game } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        }
    },
    
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            console.log(user)
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        saveGame: async (parent, { input }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedGames: input } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('Need to be logged in!')
        },

        removeGame: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedGames: { id: args.id } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('Need to be logged in!')
        }
    }
};

// Export
module.exports = resolvers;