import React from 'react';
import { connect } from 'react-redux';

class Game extends React.Component {
  render() {
    return (
      <p>Game</p>
    );
  }
}

export default connect()(Game);
