import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="name">
          <input type="text" data-testid="input-player-name" />
        </label>

        <label htmlFor="email">
          <input type="email" data-testid="input-gravatar-email" />
        </label>

        <button type="button" data-testid="btn-play">
          Play
        </button>
      </form>
    );
  }
}

export default Login;
