import React from 'react';
import { Mutation } from 'react-apollo';

class ActionButton extends React.Component {
  state = { id: null };

  render() {
    const { mutations, mutationTypes, submissionId } = this.props;
    const index = !this.state.id ? 0 : 1;
    const mutation = mutations[index];
    const id = !!this.state.id ? this.state.id : submissionId;
    return (
      <Mutation mutation={mutationTypes[index]} variables={{ id }}>
        {(mutation, { data }) => (
          <button
            onClick={e => {
              e.preventDefault();

              mutation().then(data => {
                console.log(data);
                if ((index = 0)) {
                  this.setState(() => ({ id: data.createLike.like.id }));
                } else {
                  this.setState(() => ({ id: null }));
                }
              });
            }}
            style={{ background: this.state.create ? 'white' : 'red' }}
          >
            ❤
          </button>
        )}
      </Mutation>
    );
  }
}

export default ActionButton;
