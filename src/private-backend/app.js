const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('./schema');

// Create express app
const PORT = 3030;
const app = express();

// Add routes
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  tracing: true,
  cacheControl: true
}));

// When using the OperationsStore graphiql won't work, but we can keep this up in development environments
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Run server
app.listen(PORT, () => console.log("RUNNING ON PORT ", PORT));
