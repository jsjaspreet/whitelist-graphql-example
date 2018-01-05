const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./types');

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

// All possible resolvers
const resolvers = {
  Query: {
    getBooksByTitle: (_, { title }) => books.filter(book => book.title === title),
    getBooksByAuthor: (_, { author }) => books.filter(book => book.author === author),
    books: () => books,
  }
};

// Put together a typedefs
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});


module.exports = schema;
