const RootQuery = `
  type Query { 
    getBooksByTitle(title: ID!): [Book]
    getBooksByAuthor(author: ID!): [Book]
    books: [Book]
  }
`;

module.exports = RootQuery;
