# GraphQL Whitelisted Queries Example

This repo contains an example of running two graphql servers, one public and one private. The public graphql server whitelists
known queries and proxies them to the private unrestricted graphql server.

### Prerequisites

`npm i`


To run the private unrestricted graphql server:
```bash
$ node src/private-backend/app.js
```

To run the full setup of public-private graphql servers
```bash
# in one window
$ node src/private-backend/app.js

# in another window
$ node src/public-backend/app.js

# proof that private backend is unfettered
$ node src/private-backend/test.js

# proof that public backend is restricted
$ node src/public-backend/test.js
```

`src/public-backend/app.js` contains the logic for using an `OperationStore` to house our known graphql queries for our graphql server. This
is how we reject arbitrary queries from public facing clients. The proxying code is available in `src/public-backend/schema.js`. The schema used by the 
public graphql server is a remote schema that simply proxies to our internal graphql server when the query is approved.


The private counterpart is just a regular graphql server. This allows other internal services to interact with it the way they normally would any other graphql service.


