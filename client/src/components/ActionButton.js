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
      <Mutation
        mutation={mutationTypes[index]}
        variables={{ id }}
        onCompleted={data => {
          console.log(data);
          return data.createLike
            ? this.setState(() => ({ id: data.createLike.like.id }))
            : this.setState(() => ({ id: null }));
        }}
      >
        {(mutation, { data }) => (
          <button
            onClick={e => {
              e.preventDefault();

              mutation();
            }}
            style={{ background: !!this.state.id ? 'red' : 'white' }}
          >
            ❤
          </button>
        )}
      </Mutation>
    );
  }
}

export default ActionButton;
