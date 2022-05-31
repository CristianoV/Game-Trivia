import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { actionSumAcertion, actionSumScore } from '../redux/action';
import '../styles/Game.css';
import image from '../trivia.png';
import Timer from '../components/Timer';

class Game extends React.Component {
  state = {
    questions: [],
    questionIndex: 0,
    correct: null,
    shuffle: [],
    isRunning: true,
    time: 30,
  };

  componentDidMount() {
    this.getQuestions();
    this.timer();
  }

  componentDidUpdate(_null, prevState) {
    if (prevState.time === 1) {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    const { name, hash, score } = this.props;
    const picture = `https://www.gravatar.com/avatar/${hash}`;
    const localStorageAtual = JSON.parse(localStorage.getItem('ranking'));
    if (!localStorageAtual) {
      localStorage.setItem(
        'ranking',
        JSON.stringify([{ name, picture, score }]),
      );
    }
    if (localStorageAtual) {
      localStorage.setItem(
        'ranking',
        JSON.stringify([...localStorageAtual, { name, picture, score }]),
      );
    }
  }

  tokenDenied = () => {
    const {
      history: { push },
    } = this.props;
    localStorage.removeItem('token');
    push('/');
  };

  getQuestions = async () => {
    const denied = 3;
    const token = localStorage.getItem('token');
    const request = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${token}`,
    );
    const json = await request.json();
    // console.log(json);
    if (json.response_code === denied) return this.tokenDenied();
    this.setState({ questions: json.results }, () => {
      this.shuffleQuestions();
    });
  };

  shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  shuffleQuestions = () => {
    const { questions, questionIndex } = this.state;
    const array = [
      questions[questionIndex].correct_answer,
      ...questions[questionIndex].incorrect_answers,
    ];
    const shuffle = this.shuffleArray(array);
    const correct = shuffle.indexOf(array[0]);
    this.setState({ shuffle, correct });
  };

  verifyDifficulty = () => {
    const { questions, questionIndex } = this.state;
    const currentQuestion = questions[questionIndex];
    const HARD = 3;
    const MEDIUM = 2;
    const EASY = 1;
    switch (currentQuestion.difficulty) {
    case 'easy':
      return EASY;
    case 'medium':
      return MEDIUM;
    default:
      return HARD;
    }
  };

  setAnswer = ({ target }) => {
    clearInterval(this.interval);
    const { sumScore, sumAcertion } = this.props;
    this.setState({ isRunning: false }, () => {
      if (target.className === 'correct') {
        const { time } = this.state;
        const valueDificulty = this.verifyDifficulty();
        const correct = 10;
        const value = correct + valueDificulty * time;
        sumScore(value);
        sumAcertion();
      } else {
        const value = 0;
        sumScore(value);
      }
    });
  };

  verifyAnswer = (answer, correct) => (answer === correct ? 'correct' : 'incorrect');

  addTimer = () => {
    this.setState((prevState) => ({
      time: prevState.time - 1,
    }));
  };

  timer = () => {
    const MAX_TIME = 0;
    const TIMEOUT = 1000;
    const { time } = this.state;
    if (time > MAX_TIME) {
      this.interval = setInterval(() => this.addTimer(), TIMEOUT);
      return time;
    }
  };

  buttonNext = () => {
    const { questions, questionIndex } = this.state;
    const QUESTIONS_LENGTH = questions.length;
    if (questionIndex === QUESTIONS_LENGTH - 1) {
      const { history } = this.props;
      history.push('/feedback');
    }
    this.setState(
      (prevState) => ({
        questionIndex: prevState.questionIndex + 1,
        isRunning: true,
        time: 30,
      }),
      () => {
        this.timer();
        this.shuffleQuestions();
      },
    );
  };

  render() {
    const { hash, name, score } = this.props;
    const { questions, questionIndex, correct, shuffle, isRunning, time } = this.state;
    return (
      <div className="container-player-info">
        <header className="header">
          <div className="logo-trivia">
            <img src={ image } alt="logo-game" />
          </div>
          <div className="info-game">
            {/* <span data-testid="timer">{time}</span> */}
            <Timer time={ time } />
            <p data-testid="header-score">{score}</p>
          </div>
          <div className="info-player">
            <p data-testid="header-player-name">{name}</p>
            <img
              src={ `https://www.gravatar.com/avatar/${hash}` }
              alt="profileimage"
              data-testid="header-profile-picture"
            />
          </div>
        </header>
        <main className="container-game">
          {questions.length && (
            <div>
              <p data-testid="question-text">
                {questions[questionIndex].question}
              </p>
              <p data-testid="question-category">
                {questions[questionIndex].category}
              </p>
              <p>{questions[questionIndex].difficulty}</p>
              <div data-testid="answer-options" className="answer">
                {shuffle.map((question, i) => (
                  <button
                    disabled={ time <= 0 || !isRunning }
                    onClick={ (e) => this.setAnswer(e) }
                    key={ i }
                    value={ question }
                    type="button"
                    className={
                      !isRunning
                        ? this.verifyAnswer(question, shuffle[correct])
                        : ''
                    }
                    data-testid={
                      question === shuffle[correct]
                        ? 'correct-answer'
                        : `wrong-answer-${i}`
                    }
                  >
                    {question}
                  </button>
                ))}
              </div>
              <div className="containerBtnNext">
                {(!isRunning || time === 0) && (
                  <button
                    type="button"
                    data-testid="btn-next"
                    onClick={ this.buttonNext }
                    className="buttonNext"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  hash: state.player.hash,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  sumScore: (score) => dispatch(actionSumScore(score)),
  sumAcertion: () => dispatch(actionSumAcertion()),
});

Game.propTypes = {
  name: propTypes.string.isRequired,
  hash: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
  sumScore: propTypes.func.isRequired,
  sumAcertion: propTypes.func.isRequired,
  history: propTypes.shape({ push: propTypes.func }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
