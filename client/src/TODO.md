## To Do:

- Show number of likes/favorites for each submission
- Show number of users in each challengeGroup
- Make challengeGroup submissions page - access from link in groupSubmissionsList on UserChallengePage; sort by latest or popular
- Show list of user's favorites on Dashboard Page
- Make page for all current user's submissions to userChallenge - show day/text
- View individual submission on click
- Add comment on submissions
  - Edit comment
  - Delete comment
- "Delete" userChallenge - use updateUserChallenge to set "status" field to CANCELLED
- Show challenge status in userChallenges list
- Add date picker to change challenge start date
- Add date picker to change submission date
- Add Settings page - can update username, email, password
- Show notifications if own submission liked/favorited/commented on
- finish challenge on day 100 - set status to COMPLETED

## Waiting:

## Fix

- number input in challenge settings page

## TBD

- pagination
  - UserSubmissionsList and GroupSubmissionsList show 5 at a time - click button for more
  - UserSubmissionsPage shows 20 - scroll for more
  - GroupSubmissionsPage shows 20 - scroll for more
- testing
- sort sidebar userChallenges by startDate
- make createUrl util functions, use instead of template strings
- consistent { withRouter }
- consistent component naming
- consistent variable naming
- better file structure
- fix query and mutation component structure
- Set up more queries from Apollo client cache
- Get challengeGroupSubmissions query
- Add day field back to Submission - not taken as arg, calculated on back-end
- use fragments

## Completed:

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
