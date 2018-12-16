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

module.exports = { users };