const { ApolloServer, gql, ValidationError } = require('apollo-server-express');
const User = require('../../../models/user.model');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const GraphQLUpload = require('graphql-upload/GraphQLUpload.js');
const { storeFile, deleteFile } = require('../../../helpers');

const resolver = {
  Upload: GraphQLUpload,

  Query: {
    _: () => 'Query',
  },

  Mutation: {
    _: () => 'Mutation',
  },
};

module.exports = { resolver };
