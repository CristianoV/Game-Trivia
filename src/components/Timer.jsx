import React from 'react';
import './Timer.css';
import propTypes from 'prop-types';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TIME_LIMIT: 20,
      timeLeft: 30,
    };
  }

  componentDidUpdate(prevProps) {
    const { time } = this.props;
    if (prevProps.time !== time) {
      this.setTime();
    }
  }

  setTime = () => {
    const { time } = this.props;
    this.setState({
      timeLeft: time,
    }, () => this.setCircleDasharray());
  }

  formatTimeLeft = (time) => {
    const SECONDS = 60;
    const DECIMAL = 10;
    const minutes = Math.floor(time / SECONDS);
    let seconds = time % SECONDS;
    if (seconds < DECIMAL) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

  calculateTimeFraction = () => {
    const { timeLeft, TIME_LIMIT } = this.state;
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  };

  setCircleDasharray = () => {
    const timeInicial = 182;
    const circleDasharray = `${(
      this.calculateTimeFraction() * timeInicial
    ).toFixed(0)} 283`;
    document
      .getElementById('base-timer-path-remaining')
      .setAttribute('stroke-dasharray', circleDasharray);
  };

  colorTime = () => {
    const { timeLeft } = this.state;
    const GREEN = 20;
    const WARNING = 15;
    const ALERT = 6;
    if (timeLeft > GREEN) {
      return 'green';
    } if (timeLeft <= WARNING && timeLeft > ALERT) {
      return 'warning';
    } if (timeLeft <= ALERT) {
      return 'alert';
    }
  }

  render() {
    const { timeLeft } = this.state;
    return (
      <div>
        <div className="base-timer">
          <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g className="base-timer__circle">
              <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
              <path
                id="base-timer-path-remaining"
                strokeDasharray="283"
                className={ `base-timer__path-remaining green ${this.colorTime()}` }
                d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
              />
            </g>
          </svg>
          <span id="base-timer-label" data-testid="timer" className="base-timer__label">
            {this.formatTimeLeft(timeLeft)}
          </span>
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  time: propTypes.number.isRequired,
};
