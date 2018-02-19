const { ApolloClient } = require('apollo-client');
const fetch = require('node-fetch');
const gql = require('graphql-tag');
const { HttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');

// create a request client
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://www.graphqlhub.com/graphql',
    fetch
  }),
  cache: new InMemoryCache()
});

const query = gql`
  query getGifs {
    giphy {
      random {
        id
        url
      }
    }
  }
`;

const watch = client.watchQuery({ query });
watch.startPolling(3000);


setInterval(() => console.log(watch.currentResult().data.giphy.random), 5000);
