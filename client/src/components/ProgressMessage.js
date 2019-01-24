import React from 'react';

const nothingYet = [
  'The best time to plant a tree was 20 years ago. The second best time is now. -Chinese proverb',
  "Have a bias toward action -- let's see something happen now. You can break that big plan into small steps and take the first step right away. -Indira Ghandi",
  'The journey of a thousand miles begins with one step. -Lao Tzu',
  'The secret of getting ahead is getting started. The secret of getting started is breaking your complex, overwhelming tasks into small manageable tasks, and then starting on the first one. -Mark Twain',
  "You can't be that kid standing at the top of the waterslide, overthinking it. You have to go down the chute. -Tina Fey",
  'If something is important enough, even if the odds are against you, you should still do it. -Elon Musk',
  'Do the one thing you think you cannot do. Fail at it. Try again. Do better the second time. The only people who never tumble are those who never mount the high wire. This is your moment. Own it. -Oprah Winfrey',
  "I fear failure, but I won't let it stop me. Sometimes you've just got to do it or else it just doesn't happen. -Mark Cuban",
  "Sometimes, I shake if I have to do something that I've never done before –– maybe not noticeably, but inside. But I'll do it, because I know it's not an insurmountable task; I've done plenty of tasks in my life. -Martha Stewart",
  'A goal without a timeline is just a dream. -Robert Herjavec',
  'If you want to live a happy life, tie it to a goal, not to people or things. -Albert Einstein',
];

const justStarted = [
  'Each step you take reveals a new horizon. You have taken the first step today. Now, I challenge you to take another. -Dan Poynter',
  'It does not matter how slowly you go so long as you do not stop. -Confucius',
  'Big things have small beginnings. -Promethus',
  'You have to set goals that are almost out of reach. If you set a goal that is attainable without much work or thought, you are stuck with something below your true talent and potential. —Steve Garvey',
  'It’s up to you to make your life. Take what you have and stack it up like a tower of teetering blocks. Build your dream around that. – Cheryl Strayed',
  "You don't learn to walk by following the rules. You learn by doing, and falling over. - Richard Branson",
];

const makingProgress = [
  'Success is the sum of small efforts, repeated day in and day out. -Robert Collier',
  'Be not afraid of growing slowly, be afraid only of standing still. -Chinese proverb',
  'Take small steps every day and one day you will get there!',
  'Our goals can only be reached through a vehicle of a plan, in which we must fervently believe, and upon which we must vigorously act. There is no other route to success. —Pablo Picasso',
  'Never give up. Today is hard, tomorrow will be worse, but the day after tomorrow will be sunshine. - Jack Ma',
  "The future rewards those who press on. I don't have time to feel sorry for myself. I don't have time to complain. I'm going to press on. -Barack Obama",
  "Everyone's dream can come true if you just stick to it and work hard. -Serena Williams",
  'Success consists of going from failure to failure without loss of enthusiasm. -Winston Churchill',
  'Hustling is putting every minute and all your effort into achieving the goal at hand. Every minute needs to count. -Gary Vaynerchuk',
];

const moreThanHalfway = [
  'All who have accomplished great things have had a great aim, have fixed their gaze on a goal which was high, one which sometimes seemed impossible. —Orison Swett Marden',
  'Success is the progressive realization of a worthy goal or ideal. —Earl Nightingale',
  'One way to keep momentum going is to have constantly greater goals. —Michael Korda',
  'Goals. There’s no telling what you can do when you get inspired by them. There’s no telling what you can do when you believe in them. And there’s no telling what will happen when you act upon them.” —Jim Rohn',
  'A goal properly set is halfway reached.” —Zig Ziglar',
  'You have to be able to get up and dust yourself off and always be going forward. -Rita Moreno',
];

const almostThere = [
  'One may walk over the highest mountain one step at a time. -John Wanamaker',
  'The key to realizing a dream is to focus not on success but on significance -- and then even the small steps and little victories along your path will take on greater meaning. -Oprah Winfrey',
  "Impossible is just a word thrown around by small men who find it easier to live in the world they've been given than to explore the power they have to change it.Impossible is not a fact. It's an opinion. Impossible is potential. Impossible is temporary. Impossible is nothing. – Muhammad Ali",
];

const completed = [
  'You measure the size of the accomplishment by the obstacles you have to overcome to reach your goals. - Booker T. Washington',
  'You are never too old to set a new goal or to dream a new dream. - C.S. Lewis',
  "It's harder to stay on top than it is to make the climb. Continue to seek new goals. -Pat Summitt",
  "It always seems impossible until it's done. -Nelson Mandela",
  'To live a fulfilled life, we need to keep creating the "what is next", of our lives. Without dreams and goals there is no living, only merely existing, and that is not why we are here. -Mark Twain',
];

const ProgressMessage = ({ progressPercent }) => {
  if (progressPercent >= 100) {
    return (
      <div>
        <p className="no-submissions p-b-30 p-x-30">Congratulations, you did it!</p>
        <p className="no-submissions p-b-30 p-x-30">{completed[Math.floor(Math.random() * completed.length)]}</p>
      </div>
    );
  } else if (progressPercent < 100 && progressPercent >= 80) {
    return <p className="no-submissions p-b-30 p-x-30">{almostThere[Math.floor(Math.random() * almostThere.length)]}</p>;
  } else if (progressPercent < 80 && progressPercent >= 50) {
    return (
      <p className="no-submissions p-b-30 p-x-30">
        {moreThanHalfway[Math.floor(Math.random() * moreThanHalfway.length)]}
      </p>
    );
  } else if (progressPercent < 50 && progressPercent >= 20) {
    return (
      <p className="no-submissions p-b-30 p-x-30">{makingProgress[Math.floor(Math.random() * makingProgress.length)]}</p>
    );
  } else if (progressPercent < 20 && progressPercent > 0) {
    return <p className="no-submissions p-b-30 p-x-30">{justStarted[Math.floor(Math.random() * justStarted.length)]}</p>;
  } else if (progressPercent === 0) {
    return <p className="no-submissions p-b-30 p-x-30">{nothingYet[Math.floor(Math.random() * nothingYet.length)]}</p>;
  } else return <p className="no-submissions p-b-30 p-x-30">You've progressed outside the realms of reality...</p>;
};

export default ProgressMessage;
