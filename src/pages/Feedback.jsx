import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Feedback extends React.Component {
  feedbackMessage = () => {
    const { scorePlayer } = this.props;
    const NUMBER_MIN_WELL_DONE = 3;
    if (scorePlayer >= NUMBER_MIN_WELL_DONE) {
      return 'Well Done!';
    } return 'Could be better...';
  }

  playAgainButton = () => {
    const { history } = this.props;
    history.push('/game');
  }

  catchGravatar = () => {
    const { EmailGravatar } = this.props;
    const email = md5(EmailGravatar).toString();
    return `https://www.gravatar.com/avatar/${email}`;
  }

  render() {
    const { namePlayer, assertionsPlayer, scorePlayer } = this.props;
    return (
      <>
        <header>
          <img
            src={ this.catchGravatar() }
            data-testid="header-profile-picture"
            alt="Avatar do player"
          />
          <p data-testid="header-player-name">{namePlayer}</p>
          <p data-testid="header-score">{scorePlayer}</p>
        </header>
        <section>
          <p data-testid="feedback-text">{this.feedbackMessage()}</p>
          <p data-testid="feedback-total-score">{Number(scorePlayer)}</p>
          <p data-testid="feedback-total-question">{Number(assertionsPlayer)}</p>
        </section>
        <nav>
          <input
            type="button"
            value="Play Again"
            data-testid="btn-play-again"
            onClick={ () => this.playAgainButton() }
          />
        </nav>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  namePlayer: state.player.name,
  EmailGravatar: state.player.gravatarEmail,
  scorePlayer: state.player.score,
  assertionsPlayer: state.player.assertions,
});

Feedback.propTypes = {
  namePlayer: PropTypes.string.isRequired,
  scorePlayer: PropTypes.number.isRequired,
  EmailGravatar: PropTypes.string.isRequired,
  assertionsPlayer: PropTypes.number.isRequired,
  history: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps)(Feedback);
