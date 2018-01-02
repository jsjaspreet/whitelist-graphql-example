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
    books: () => books,
  }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});


module.exports = schema;
