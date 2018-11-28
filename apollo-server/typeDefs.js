const { gql } = require('apollo-server');

const typeDefs = gql`
  # Placeholder types

  type User {
    userId: Int
    userName: String
    userJourneys: [Journey]
  }

  # Collection of days in a specific user journey
  type Journey {
    userId: String
    journeyName: String
    journeyDays: [Day]
  }

  # A specific day in a journey
  type Day {
    dayNumber: String
    dayContent: String
  }

  type Query {
    users: [User]
    journeys: [Journey]
    days: [Day]
  }
`;

module.exports = typeDefs;
