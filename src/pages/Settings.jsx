import React from 'react';
import { connect } from 'react-redux';

class Settings extends React.Component {
  render() {
    return (
      <p data-testid="settings-title">Settings</p>
    );
  }
}

export default connect()(Settings);
