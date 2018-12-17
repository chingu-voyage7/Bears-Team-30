import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

import App from './components/App.js';
import './styles/normalize.scss';

const token = localStorage.getItem('token');

const client = new ApolloClient({
  headers: {
    authorization: token ? `Bearer ${token}` : '',
  },
});

client
  .query({
    query: gql`
      {
        auth {
          isAuthenticated
        }
      }
    `,
  })
  .then(result => console.log('result: ', result));

ReactDOM.render(<App />, document.getElementById('app'));
