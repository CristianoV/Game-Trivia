import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  feedbackMessage = () => {
    const { scorePlayer } = this.props;
    const NUMBER_MIN_WELL_DONE = 3;
    if (scorePlayer <= NUMBER_MIN_WELL_DONE) {
      return 'Could be better...';
    } return 'Well Done!';
  }

  playAgainButton = () => {
    const { history } = this.props;
    history.push('/game');
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
            data-testid="btn-ranking"
            onClick={ () => this.playAgainButton() }
          />
          <input
            type="button"
            value="Ranking"
            data-testid="btn-play-again"
            onClick={ () => this.rankingButton() }
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
  hashPlayer: state.player.hash,
});

Feedback.propTypes = {
  namePlayer: PropTypes.string.isRequired,
  scorePlayer: PropTypes.number.isRequired,
  assertionsPlayer: PropTypes.number.isRequired,
  history: PropTypes.shape.isRequired,
  hashPlayer: PropTypes.string.isRequired,

};

export default connect(mapStateToProps)(Feedback);
