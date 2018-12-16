const { gql } = require('apollo-server');

const ResponseCodes = gql`
  enum ResponseCodes {
    s200 # Success
    e405 # Invalid authorization header / not logged in
    e410 # Generic failure
    e411 # Invalid input: email and username are duplicates
    e412 # Invalid input: username is duplicate
    e413 # Invalid input: email is duplicate
    e414 # Invalid input: userid doesn't exist
    e500 # Database error
  }
`;

module.exports = ResponseCodes;
