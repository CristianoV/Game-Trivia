import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

  verifyInput = () => {
    const { name, email } = this.state;
    const regexEmail = /\S+@\S+\.\S+/.test(email);
    return !(name.length && regexEmail);
  };

  fetchToken = async () => {
    const request = await fetch(
      'https://opentdb.com/api_token.php?command=request',
    );
    const json = await request.json();
    return json.token;
  };

  handleClick = async () => {
    const token = await this.fetchToken();
    localStorage.setItem('token', token);
    const { history } = this.props;
    history.push('/game');
  };

  render() {
    const { name, email } = this.state;
    const { history } = this.props;
    return (
      <form>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            data-testid="input-player-name"
            id="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            data-testid="input-gravatar-email"
            id="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>

        <button
          name="play"
          type="button"
          data-testid="btn-play"
          disabled={ this.verifyInput() }
          onClick={ this.handleClick }
        >
          Play
        </button>

        <button
          name="settings"
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Settings
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = () => ({});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);