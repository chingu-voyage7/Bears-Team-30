## Can Do:

- Make page to show all submissions in challengeGroup - get to it from list of group submissions in UserChallengePage; sort by latest or popular
- View individual submission on click
- Add comment on submissions
  - Edit comment
  - Delete comment
- "Delete" userChallenge - use updateUserChallenge to set "status" field to CANCELLED
- Add date picker to change challenge start date
- Add date picker to change submission date
- Add Settings page - can update username, email, password

## Waiting:

- Show list of all favorite submissions on Dashboard page (waiting for myFavorites query)

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
- ActionButton updates on create/delete like and favorite
