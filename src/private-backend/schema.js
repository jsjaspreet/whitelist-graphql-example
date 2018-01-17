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

const vehicles = [
  {
    maxSpeed: 42,
    wingspan: 20
  },
  {
    maxSpeed: 10,
    licensePlate: "10HONEY"
  }
];

// All possible resolvers
const resolvers = {
  Vehicle: {
    __resolveType(obj, context, info){
      if(obj.wingspan){
        return 'Airplane';
      }

      if(obj.licensePlate){
        return 'Car';
      }

      return null;
    },
  },
  Query: {
    getBooksByTitle: (_, { title }) => books.filter(book => book.title === title),
    getBooksByAuthor: (_, { author }) => books.filter(book => book.author === author),
    vehicles: () => vehicles,
    books: () => books,
  }
};

// Put together a typedefs
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});


module.exports = schema;
