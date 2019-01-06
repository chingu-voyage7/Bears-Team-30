## To Do

- Show list of user's favorites on Dashboard Page
- View individual submission on click
- Add comment on submissions
  - Edit comment
  - Delete comment
- "Delete" userChallenge - use updateUserChallenge to set "status" field to CANCELLED
- Add Settings page - can update username, email, password
- Show notifications if own submission liked/favorited/commented on

## Fix

- EditSubmissionPage uses query if location.state undefined
- number input in challenge settings page
- challenge progress updates when submission added with +progress
- challenge ends after day 100 - set status to COMPLETED
- show usernames on submissions in submission lists
- Show number of users in each challengeGroup
- Show challenge status in userChallenges list
- add more groups
- add landing page info
- GroupSubmissionsPage can sort by date or popular
- Add date picker to change challenge start date
- Add date picker to change submission date
- sort sidebar userChallenges by startDate
- make createUrl util functions, use instead of template strings
- consistent { withRouter }
- consistent component naming
- consistent variable naming
- better file structure
- fix query and mutation component structure
- Set up more queries from Apollo client cache
- use fragments

## TBD

- testing

## Completed

- Add createUserChallenge mutation to button on ChallengeGroupsList
- Add editUserChallenge mutation to button on JoinChallengeGroupPage
- createSubmission adds submission to userChallenge
- createSubmission also adds submission to challengeGroup submissions
- View all submissions in own userChallenge
- Edit submission
- Delete submission
- Edit userChallenge
- Add like and favorite on submissions
- List of user challenges in sidebar updates on createUserChallenge and editUserChallenge
- ActionButton updates on create/delete like and favorite
- GroupSubmissionsList shows pages of 5 submissions
- GroupSubmissionsPage shows pages of 20 submissions
- Make UserSubmissionsPage to show submissions by user to current challenge
- Show number of likes/favorites for each submission
