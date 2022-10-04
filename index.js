require('dotenv').config();

const express = require('express');
const {
  ApolloServer,
  ValidationError,
  ForbiddenError,
} = require('apollo-server-express');

// const { typeDefs, resolvers } = require('./schema');
const { graphqlModules } = require('./graphql');

const error_response = require('./error_response');
const { getUserByToken } = require('./utils');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { applyMiddleware } = require('graphql-middleware');
const permissions = require('./permissions');
const graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.js');

const connectDB = require('./db/db')();
const app = express();

const port = process.env.PORT || 7777;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const startApp = async () => {
  const { typeDefs, resolvers } = await graphqlModules();

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const schemaWithPermissions = applyMiddleware(schema, permissions);

  const server = new ApolloServer({
    schema: schemaWithPermissions,
    context: async ({ req }) => {
      const user = await getUserByToken(req);
      return user ? { auth_user: user } : null;
    },
    formatError: (err) => error_response(err),
  });

  app.use(
    graphqlUploadExpress({
      maxFileSize: 10000000, // 10 MB
      maxFiles: 10,
    })
  );

  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });
  console.log(`Apollo Server on http://localhost:${port}/graphql`);
};

startApp();

app.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
