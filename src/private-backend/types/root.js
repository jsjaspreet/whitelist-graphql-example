const RootQuery = `
  type Query { 
    getBooksByTitle(title: ID!): [Book]
    getBooksByAuthor(author: ID!): [Book]
    books: [Book]
    vehicles: [Vehicle]
  }
`;

module.exports = RootQuery;
