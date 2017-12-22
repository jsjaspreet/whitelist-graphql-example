# GraphQL Whitelisted Queries Example

This repo contains a simple graphql server in `src/backend/app.js` that uses an `OperationStore` to provide a whitelist functionality to the graphql server.
Any query made against this graphql server will be checked against the whitelist, and only resolved if the query is allowed. This effectively locks down the graphql server to only allowed interactions.


To run the repo:

```bash
➜  node src/backend/app.js
  RUNNING ON PORT 3030
➜  node src/backend/test.js
{ getBooksByAuthor: 
   [ { title: 'Harry Potter and the Sorcerer\'s stone',
       author: 'Rowling',
       __typename: 'Book' },
     { title: 'Harry Potter and the Goblet of Fire',
       author: 'Rowling',
       __typename: 'Book' } ] }
```


