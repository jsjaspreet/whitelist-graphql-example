const BooksQuery = `
  query books {
    book {
      author
      title
    }
  }
`;

module.exports = BooksQuery;
