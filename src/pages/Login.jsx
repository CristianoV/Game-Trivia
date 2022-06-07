import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { actionLogin, setHash } from '../redux/action';
import '../styles/Login.css';
import image from '../trivia.png';

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

  handleClick = async (info) => {
    const { setEmail, setHashAction } = this.props;
    setEmail(info);
    setHashAction(md5(info.gravatarEmail).toString());
    const token = await this.fetchToken();
    localStorage.setItem('token', token);
    // this.storage();
    const { history } = this.props;
    history.push('/game');
  };

  render() {
    const { name, email } = this.state;
    const { history } = this.props;
    return (
      <div className="container-login">
        <img src={ image } alt="logo-game" />
        <form>
          <div className="name-player">
            <label htmlFor="name">
              NAME:
              <input
                type="text"
                data-testid="input-player-name"
                id="name"
                required
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
          </div>

          <div className="email-player">
            <label htmlFor="email">
              EMAIL:
              <input
                type="email"
                data-testid="input-gravatar-email"
                id="email"
                required
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
          </div>

          <button
            name="play"
            type="button"
            data-testid="btn-play"
            disabled={ this.verifyInput() }
            onClick={ () => this.handleClick({ name, gravatarEmail: email }) }
          >
            Play
          </button>

          <button
            name="ranking"
            type="button"
            onClick={ () => history.push('/ranking') }
          >
            Ranking
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
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(actionLogin(email)),
  setHashAction: (hash) => dispatch(setHash(hash)),
});

Login.propTypes = {
  setEmail: PropTypes.func.isRequired,
  setHashAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
