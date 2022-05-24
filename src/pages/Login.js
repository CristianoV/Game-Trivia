import React from 'react';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    });
  };

  render() {
    const { name, email } = this.state;

    return (
      <form>
        <label htmlFor="name">
          <input
            type="text"
            data-testid="input-player-name"
            id="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="email">
          <input
            type="email"
            data-testid="input-gravatar-email"
            id="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>

        <button type="button" data-testid="btn-play">
          Play
        </button>
      </form>
    );
  }
}

export default Login;
