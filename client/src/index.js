import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';

import AppRouter from './routers/AppRouter.js';
import './styles/index.scss';

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      submission: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: 'Submission', id: args.id }),
      userChallenge: (_, args, { getCacheKey }) =>
        getCacheKey({ __typename: 'Challenge', id: args.id }),
    },
  },
});

const request = operation => {
  const token = localStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token,
    },
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    requestLink,
    new HttpLink({
      uri: 'https://bears-30.herokuapp.com/graphql',
      credentials: 'same-origin',
    }),
  ]),
  cache,
});

const App = (
  <ApolloProvider client={client}>
    <AppRouter />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('app'));
