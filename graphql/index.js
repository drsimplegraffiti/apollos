const { loadFiles } = require('@graphql-tools/load-files');
const { mergTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { loadSchema } = require('@graphql-tools/load');
const { printSchema } = require('graphql');

const graphqlModules = async () => {
  const typeDefs = await loadSchema('./**/*.graphql', {
    loaders: [new GraphQLFileLoader()],
  });

  const resolvers = mergeResolvers(await loadFiles('./**/*.resolver.js'));
  const schema = {
    typeDefs,
    resolvers,
  };

  console.log(printSchema(typeDefs));
  console.log(resolvers);
  // console.log(await loadFiles('./**/*.graphql'));
  return schema;
};

module.exports = { graphqlModules };
