import React from 'react';
import { Mutation } from 'react-apollo';

class ActionButton extends React.Component {
  state = { id: null };

  render() {
    const { mutations, mutationTypes, submissionId, text, type } = this.props;
    const index = !this.state.id ? 0 : 1;
    const mutation = mutations[index];
    const id = !!this.state.id ? this.state.id : submissionId;
    const create = mutations[0];
    return (
      <Mutation
        mutation={mutationTypes[index]}
        variables={{ id }}
        onCompleted={data => {
          console.log(data);
          return data[create]
            ? this.setState(() => ({ id: data[create][type].id }))
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
            {text}
          </button>
        )}
      </Mutation>
    );
  }
}

export default ActionButton;
