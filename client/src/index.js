import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import AppRouter from './routers/AppRouter.js';
import './styles/normalize.scss';

const token = localStorage.getItem('token');

const client = new ApolloClient({
  headers: {
    authorization: token ? `Bearer ${token}` : '',
  },
});

const App = (
  <ApolloProvider client={client}>
    <AppRouter />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('app'));
