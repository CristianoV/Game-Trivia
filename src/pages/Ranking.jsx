import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  backToLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <main>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.backToLogin }
        >
          Login
        </button>
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
