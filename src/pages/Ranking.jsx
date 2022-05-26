import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  backToLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const RankingToLocalStorage = localStorage.getItem('ranking');
    console.log(RankingToLocalStorage);
    return (
      <main>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.backToLogin }
        >
          Login
        </button>
        <div>
          <ul>
            { RankingToLocalStorage.length ? (
              RankingToLocalStorage.map((player, index) => (
                <li key={ index }>
                  <div data-testid={ `player-name-${index}` }>{player.name}</div>
                  <div data-testid={ `player-score-${index}` }>{player.score}</div>
                </li>))
            ) : null }
          </ul>
        </div>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
