const BooksQuery = `
  query books {
    books {
      author
      title
    }
  }
`;

module.exports = BooksQuery;
