const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const { User, Package } = require("../models");
const { fedexScraper } = require("../utils/scraper");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("packages");

        return userData;
      }
      throw new AuthenticationError(`You aren't logged in!`);
    },
    packages: async (parent, { username }, context) => {
      const params = username ? { username } : {};
      const allPackages = await Package.find(params);
      return allPackages;
    },
    package: async (parent, { _id }, context) => {
      const singlePackage = await Package.findById({ _id });
      return singlePackage;
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    addPackage: async (parent, { trackingNumber }, context) => {
      if (context.user) {
        const packageData = await fedexScraper(trackingNumber);
        const newPackage = await Package.create(
          {
            ...packageData,
            username: context.user.username,
          },
          { runValidators: true, new: true }
        );

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { packages: newPackage._id } }
        );
        return newPackage;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removePackage: async (parent, { _id }, context) => {
      if (context.user) {
        const deletedPackage = await Package.findByIdAndDelete({ _id: _id });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { events: deletedPackage._id } },
          { new: true }
        );
        return deletedPackage;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
