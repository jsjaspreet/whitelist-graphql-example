import ApolloClient, { createNetworkInterface } from 'apollo-client';
import React, {PureComponent} from 'react';
const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3030/graphql'
  }),
  connectToDevTools: true,
});

const query = gql`
  {
    books {
      title
      author
    }
  }
`;

const BookContainer = graphql(query);

function Book({ title, author }) {
  return (
    <div>
      {`${title} - ${author}`}
    </div>
  );
}

let BookList = function BookList({ data }) {
  return (
    <div>
      {
        data.books.map((book, index) => <Book key={index} {...book} />)
      }
    </div>
  );
}

class App extends PureComponent {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <h2>Apollo Frontend Example</h2>
            <BookList />
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;