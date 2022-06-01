import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionResetPlayer } from '../redux/action';
import triviaImg from '../trivia.png';
import '../styles/Feedback.css';

class Feedback extends React.Component {
  componentWillUnmount() {
    const { reset } = this.props;
    reset();
  }

  feedbackMessage = () => {
    const { assertionsPlayer } = this.props;
    const NUMBER_MIN_WELL_DONE = 3;
    if (assertionsPlayer >= NUMBER_MIN_WELL_DONE) {
      return 'Well Done!';
    } return 'Could be better...';
  }

  playAgainButton = () => {
    const { history } = this.props;
    history.push('/');
  }

  rankingButton = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  catchGravatar = () => {
    const { hashPlayer } = this.props;
    return `https://www.gravatar.com/avatar/${hashPlayer}`;
  }

  render() {
    const { namePlayer, assertionsPlayer, scorePlayer } = this.props;
    return (
      <div className="feedback-container">
        <header className="header">
          <div className="logo-trivia"><img src={ triviaImg } alt="logo-game" /></div>
          <div className="info-game">
            <p>Pontos:</p>
            <span data-testid="header-score">{scorePlayer}</span>
          </div>
          <div className="info-player">
            <p data-testid="header-player-name">{namePlayer}</p>
            <img
              src={ this.catchGravatar() }
              alt="profileimage"
              data-testid="header-profile-picture"
            />
          </div>
        </header>
        <section className="game-status">
          <p data-testid="feedback-text">{this.feedbackMessage()}</p>
          <span>Pontos:</span>
          <p data-testid="feedback-total-score">{scorePlayer}</p>
          <span>Total de acertos:</span>
          <p data-testid="feedback-total-question">
            {assertionsPlayer}
          </p>
        </section>
        <nav className="btn-container-feedback">
          <input
            type="button"
            value="Play Again"
            data-testid="btn-play-again"
            onClick={ () => this.playAgainButton() }
          />
          <input
            type="button"
            value="Ranking"
            data-testid="btn-ranking"
            onClick={ () => this.rankingButton() }
          />
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  namePlayer: state.player.name,
  EmailGravatar: state.player.gravatarEmail,
  scorePlayer: state.player.score,
  assertionsPlayer: state.player.assertions,
  hashPlayer: state.player.hash,
});

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(actionResetPlayer()),
});

Feedback.propTypes = {
  namePlayer: PropTypes.string.isRequired,
  scorePlayer: PropTypes.number.isRequired,
  assertionsPlayer: PropTypes.number.isRequired,
  history: PropTypes.shape.isRequired,
  hashPlayer: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
