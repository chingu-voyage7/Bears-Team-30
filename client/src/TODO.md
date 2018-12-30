~~- Add createUserChallenge mutation to button on ChallengeGroupsList~~

~~- Add editUserChallenge mutation to button on JoinChallengeGroupPage~~
~~- createSubmission adds submission to userChallenge~~
~~- createSubmission also adds submission to challengeGroup submissions~~

~~- View all submissions in own userChallenge~~

~~- Edit submission~~

~~- Delete submission~~

~~- Edit userChallenge~~

- Delete userChallenge

```js
<Mutation mutation={DELETE_USER_CHALLENGE}>
  {(deleteUserChallenge, { data: deleteData }) => (
    <button
      type="button"
      onClick={e => {
        e.preventDefault();

        deleteUserChallenge({
          variables: {
            userChallengeId,
          },
        }).then(() => this.props.history.push(routes.DASHBOARD));
      }}
    >
      Leave Challenge
    </button>
  )}
</Mutation>
```

- Change Sidebar to subscription
- Change ActionButton to subscription
- Make page to show all submissions in challengeGroup - get to it from list of group submissions in UserChallengePage; sort by latest, popular
  ~~- Add like and favorite on submissions~~
- Show list of all favorite submissions on Dashboard page
- View individual submission on click?
- Add comment on submissions?
- Edit comment
- Delete comment
- Add date picker to change challenge start date?
- Add date picker to change submission date?
- Add Settings page - can update username, email, password

- pagination
  - UserSubmissionsList and GroupSubmissionsList show 10 at a time - click button for more
  - UserSubmissionsPage shows all
  - GroupSubmissionsPage shows 40 - scroll for more
- testing
- sort sidebar userChallenges by startDate
- refactor
  - consistent { withRouter }
  - consistent component naming
  - consistent variable naming
  - better file structure
  - fix query and mutation component structure
