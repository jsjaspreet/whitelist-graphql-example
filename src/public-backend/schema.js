const { makeExecutableSchema, makeRemoteExecutableSchema } = require('graphql-tools');
const fetch = require('node-fetch');
const { HttpLink } = require('apollo-link-http');
const typeDefs = require('../common-graphql/types');

// point to private backend
const link = new HttpLink({ uri: 'http://localhost:3030/graphql', fetch });

// Construct schema
const schema = makeExecutableSchema({ typeDefs });

// Use link to create a remote executable schema
const executableSchema = makeRemoteExecutableSchema({
  schema,
  link
});


module.exports = executableSchema;
