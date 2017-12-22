const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { OperationStore } = require('apollo-server-module-operation-store');
const { makeExecutableSchema } = require('graphql-tools');

// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'Rowling'
  },
  {
    title: "Harry Potter and the Goblet of Fire",
    author: 'Rowling'
  },
  {
    title: 'Jurassic Park',
    author: 'Crichton'
  }
];

// The GraphQL schema in string form
const typeDefs = `
  type Query { 
    getBooksByTitle(title: ID!): [Book]
    getBooksByAuthor(author: ID!): [Book]
    books: [Book]
  }
  type Book { title: String, author: String }
`;

// All possible resolvers
const resolvers = {
  Query: {
    getBooksByTitle: (_, { title }) => books.filter(book => book.title === title),
    getBooksByAuthor: (_, { author }) => books.filter(book => book.author === author),
    books: () => books
  }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});


// Create express app
const PORT = process.env.BACKEND_PORT || 3030;
const app = express();

// Whitelisting
const store = new OperationStore(schema);

// Only allow the author query
const AuthorQuery = `
  query getBooksByAuthor($author: ID!) {
    getBooksByAuthor(author: $author) {
      __typename
      title
      author
    }
  }
`;

// Add whitelisted query to the store
store.put(AuthorQuery);

// Add routes
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  // use the formatParams option to match the operationName of the request to the underlying query that it maps to
  formatParams(params) {
    const whitelistedQuery = store.get(params.operationName);
    if (!whitelistedQuery) {
      console.log("This query/operation is not whitelisted");
    }
    params['query'] = whitelistedQuery;
    return params;
  }
}));

// When using the OperationsStore graphiql won't work, but we can keep this up in development environments
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Run server
app.listen(PORT, () => console.log("RUNNING ON PORT ", PORT));
