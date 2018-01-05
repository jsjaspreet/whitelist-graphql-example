const { ApolloLink } = require('apollo-link');
const { makeRemoteExecutableSchema, introspectSchema } = require('graphql-tools');
const fetch = require('node-fetch');
const { HttpLink } = require('apollo-link-http');
const { RetryLink } = require('apollo-link-retry');

async function getSchema() {
  // combine retry logic with basic http link
  const link = ApolloLink.from([
    new RetryLink(),
    new HttpLink({ uri: 'http://localhost:3030/graphql', fetch }),
  ]);

  // Construct schema
  const schema = await introspectSchema(link);

  // Use link to create a remote executable schema
  const executableSchema = makeRemoteExecutableSchema({
    schema,
    link
  });

  return executableSchema;
}

module.exports = getSchema;
