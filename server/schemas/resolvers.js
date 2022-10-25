const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const { User, Package } = require("../models");
const { trackingScraper } = require("../utils/scraper");

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
      if (context.user) {
        const allPackages = await Package.find(context.username);
        return allPackages;
      }
      throw new AuthenticationError(`You aren't logged in!`);
    },
    package: async (parent, { trackingNumber }, context) => {
      try {
        const singlePackage = await Package.findOne({
          trackingNumber: trackingNumber,
        });
        console.log(singlePackage);
        if (singlePackage === null) {
          return { error: "Oops, seems like the tracking number is wrong!" };
        }
        return singlePackage;
      } catch (error) {
        return error;
      }
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
    updatePackageInfo: async (parent, { trackingNumber }, context) => {
      if (context.user) {
        const requestPackage = await Package.findOne({
          trackingNumber: trackingNumber,
        });
        const scrapedPackage = await trackingScraper(
          requestPackage.trackingNumber
        );
        const updatedPackage = await Package.findByIdAndUpdate(
          { _id: requestPackage._id },
          { ...scrapedPackage, username: context.user.username },
          { runValidators: true, new: true }
        );
        return updatedPackage;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addPackage: async (parent, { trackingNumber }, context) => {
      if (context.user) {
        const packageData = await trackingScraper(trackingNumber);
        const newPackage = await Package.create({
          trackingNumber: trackingNumber,
          urlToTracking: packageData.urlToTracking,
          expectedDelDate: packageData.expectedDelDate,
          carrier: packageData.carrier,
          username: context.user.username,
        });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { packages: newPackage._id } }
        );
        return newPackage;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removePackage: async (parent, { trackingNumber }, context) => {
      if (context.user) {
        const deletedPackage = await Package.findOneAndDelete({
          trackingNumber: trackingNumber,
        });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { packages: deletedPackage._id } },
          { new: true }
        );
        return deletedPackage;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
