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

module.exports = AuthorQuery;
