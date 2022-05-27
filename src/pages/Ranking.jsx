import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  state = {
    ranking: [],
  }

  componentDidMount() {
    const RankingToLocalStorage = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ ranking: RankingToLocalStorage.sort((a, b) => b.score - a.score) });
  }

  backToLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { ranking } = this.state;
    return (
      <>
        <header data-testid="ranking-title">
          Tela de Ranking
        </header>
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
              { ranking.length !== 0 ? (
                ranking.map((player, index) => (
                  <li key={ index }>
                    <div data-testid={ `player-name-${index}` }>{player.name}</div>
                    <div data-testid={ `player-score-${index}` }>{player.score}</div>
                  </li>))
              ) : null }
            </ul>
          </div>
        </main>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
