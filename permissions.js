const { shield } = require('graphql-shield');
const {
  isAuthenticated,
  signupValidation,
  loginValidation,
} = require('./rules');

const permissions = shield(
  {
    Query: {
      me: isAuthenticated,
    },
    Mutation: {
      signup: signupValidation,
      login: loginValidation,
    },
  },
  {
    allowExternalErrors: true,
    debug: true,
    fallbackError: async (error, parent, args, ctx, info) => {
      console.log({ error });
      return error;
    },
  }
);

module.exports = permissions;
