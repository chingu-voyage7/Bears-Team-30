const { ApolloServer, gql } = require('apollo-server');
const db = require('../postgresDb');



const users = [
  {
    userId: 1,
    userName: 'Paul',
    userJourneys: [
      {
        userId: 1,
        journeyName: 'GraphQl',
        journeyDays: [{ dayNumber: 1, dayContent: 'Apollo server' }],
      },
    ],
  },
  {
    userId: 2,
    userName: 'Gertrude',
    userJourneys: [
      {
        userId: 2,
        journeyName: 'Poetry',
        journeyDays: [{ dayNumber: 1, dayContent: 'Tender buttons' }],
      },
    ],
  },
  {
    userId: 3,
    userName: 'Pablo',
    userJourneys: [
      {
        userId: 3,
        journeyName: 'Oil painting',
        journeyDays: [{ dayNumber: 1, dayContent: 'Guernica' }],
      },
    ],
  },
];

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

const resolvers = {
  Query: {
    users: () => users,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server listening at ${url}`);
});
