const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    packages: [Package]
  }
  type Package {
    _id: ID!
    trackingNumber: String!
    urlToTracking: String
    expectedDelDate: String
    carrier: String
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    package(trackingNumber: String!): Package
    packages(username: String!): [Package]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPackage(trackingNumber: String!, username: String): Package
    removePackage(_id: ID): Package
    updatePackageInfo(_id: ID): Package
  }
`;

module.exports = typeDefs;
