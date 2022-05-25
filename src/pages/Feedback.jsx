import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Feedback extends React.Component {
  feedbackMessage = () => {
    const { scorePlayer } = this.props;
    const NUMBER_MIN_WELL_DONE = 3;
    if (scorePlayer <= NUMBER_MIN_WELL_DONE) {
      return 'Could be better...';
    } return 'Well Done!';
  }

  catchGravatar = () => {
    const { EmailGravatar } = this.props;
    const email = md5(EmailGravatar).toString();
    return `https://www.gravatar.com/avatar/${email}`;
  }

  render() {
    const { namePlayer, scorePlayer } = this.props;
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
        <div>
          <p data-testid="feedback-text">{this.feedbackMessage()}</p>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  namePlayer: state.player.name,
  EmailGravatar: state.player.gravatarEmail,
  scorePlayer: state.player.score,
});

Feedback.propTypes = {
  namePlayer: PropTypes.string.isRequired,
  scorePlayer: PropTypes.number.isRequired,
  EmailGravatar: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
