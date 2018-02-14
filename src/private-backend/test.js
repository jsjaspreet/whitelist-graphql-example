const { ApolloClient } = require('apollo-client');
const fetch = require('node-fetch');
const gql = require('graphql-tag');
const { HttpLink } = require('apollo-link-http');
const { InMemoryCache, IntrospectionFragmentMatcher } = require('apollo-cache-inmemory');
const introspectionQueryResultData = require('./fragmentTypes.json');

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

// create a request client
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3030/graphql',
    fetch
  }),
  cache: new InMemoryCache({ fragmentMatcher })
});

// DO NOT construct this mutation string by hand, use graphiql to first test your mutation and then copy that exact string here
const addCarMutation = gql`
  mutation addCar($maxSpeed: Int!, $licensePlate: String) {
    addCar(maxSpeed: $maxSpeed, licensePlate: $licensePlate) {
      maxSpeed
    }
  }
`

client.mutate({
  mutation: addCarMutation,
  variables: { maxSpeed: 1000 }
}).then((data) => console.log(data.data))
  .catch(err => console.error(err));
