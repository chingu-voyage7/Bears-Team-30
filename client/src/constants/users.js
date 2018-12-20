const USERS = [
  {
    id: 'b594be88-0e94-4aa9-be01-7968bb8d6634',
    username: 'Snoopy',
    email: 'snoopy@peanuts.com',
    password: 'snoops',
    userChallenges: [
      {
        id: '11111',
        challengeGroup: {
          id: '123',
          name: 'JavaScript',
          description:
            'Become a better web developer by building JavaScript projects.',
          category: 'TECHNOLOGY',
          goalAction: 'Create',
          goalNumber: 50,
          goalType: 'projects',
        },
        startDate: 'December 1, 2018',
        goalNumber: 50,
        status: 'IN_PROGRESS',
        user: {
          id: 'b594be88-0e94-4aa9-be01-7968bb8d6634',
          username: 'Snoopy',
          email: 'snoopy@peanuts.org',
        },
        progress: 5,
      },
    ],
  },
];

export default USERS;
