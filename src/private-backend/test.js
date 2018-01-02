const { ApolloClient } = require('apollo-client');
const fetch = require('node-fetch');
const gql = require('graphql-tag');
const { HttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');

// create a request client
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3030/graphql',
    fetch
  }),
  cache: new InMemoryCache()
});


// List of queries
const whitelistedQuery = gql`
    query getBooksByAuthor($author: ID!) {
        getBooksByAuthor(author: $author) {
            title
        }
    }
`


// Whitelisted query asking for extra fields
const masqueradeQuery = gql`
    query getBooksByAuthor($author: ID!) {
        getBooksByAuthor(author: $author) {
            title
            author
        }
    }
`


const blacklistedQuery = gql`
    query getBooksByTitle($title: ID!) {
        getBooksByTitle(title: $title) {
            title
            author
        }
    }
`

const anotherBlacklistedQuery = gql`
    query allBooks {
        books {
            title
            author
        }
    }
`


// Comment out the line below to test the whitelist functionality in action

client.query({ query: whitelistedQuery, variables: { author: 'Rowling' } }).then((data) => console.log(data.data));
client.query({ query: masqueradeQuery, variables: { author: 'Rowling' } }).then((data) => console.log(data.data));
client.query({ query: blacklistedQuery, variables: { title: 'Jurassic Park' } }).then((data) => console.log(data.data));
client.query({ query: anotherBlacklistedQuery }).then((data) => console.log(data.data));
