const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { OperationStore } = require('apollo-server-module-operation-store');
const schema = require('./schema');
const queries = require('../queries');


// Create express app
const PORT = process.env.BACKEND_PORT || 3030;
const app = express();

// Create an operation store for whitelisting purposes
const store = new OperationStore(schema);

// Add all recognized queries to the store
queries.forEach(query => store.put(query));

// Add routes
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  // use the formatParams option to match the operationName of the request to the underlying query that it maps to
  formatParams(params) {
    const whitelistedQuery = store.get(params.operationName);
    if (!whitelistedQuery) {
      console.log("This query/operation is not whitelisted");
    }
    params['query'] = whitelistedQuery;
    return params;
  }
}));

// When using the OperationsStore graphiql won't work, but we can keep this up in development environments
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Run server
app.listen(PORT, () => console.log("RUNNING ON PORT ", PORT));
