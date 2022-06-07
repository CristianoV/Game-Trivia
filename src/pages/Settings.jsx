import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import image from '../trivia.png';
import '../styles/Settings.css';

class Settings extends React.Component {
  state = {
    difficulty: ['easy', 'medium', 'hard'],
  };

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    const request = await fetch(
      'https://opentdb.com/api_category.php',
    );
    const json = await request.json();
    this.setState({ category: json.trivia_categories });
  };

  hendleChange = ({ target }, name) => {
    const settings = JSON.parse(localStorage.getItem('settings'));
    localStorage.setItem('settings',
      JSON.stringify({ ...settings, [name]: target.value }));
  }

  resetQuestion = () => {
    localStorage.removeItem('settings');
  }

  render() {
    const { category, difficulty, number } = this.state;
    const { history } = this.props;
    return (
      <>
        <header className="header">
          <div className="logo-trivia"><img src={ image } alt="logo-game" /></div>
        </header>
        <h1 className="title" data-testid="settings-title">Settings</h1>
        <form className="form-settings">
          <label htmlFor="categoryQuestions">
            <span>Category</span>
            <select
              onClick={ (e) => this.hendleChange(e, 'Category') }
              id="categoryQuestions"
            >
              <option value="">
                Select a category
              </option>
              { category && category.map((item) => (
                <option
                  key={ item.id }
                  value={ item.id }
                  id={ item.id }
                >
                  { item.name }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="difficultyQuestions">
            <span>Level</span>
            <select
              onClick={ (e) => this.hendleChange(e, 'Difficulty') }
              id="difficultyQuestions"
            >
              <option value="">
                Select a level
              </option>
              { difficulty && difficulty.map((item, index) => (
                <option
                  key={ index }
                  type="button"
                  value={ item }
                  id={ item }
                >
                  {item.toUpperCase()}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="Type">
            <span>Type</span>
            <select
              name="Type"
              id=""
              onChange={ (e) => this.hendleChange(e, 'Type') }
            >
              <option value="">Ambas alternativas</option>
              <option value="boolean">Verdadeiro ou Falso</option>
              <option value="multiple">Múltipla Escolha</option>
            </select>
          </label>
          <label htmlFor="number">
            <span>Number of questions</span>
            <input
              type="number"
              name="number"
              value={ number }
              onChange={ (e) => this.hendleChange(e, 'Number') }
              min="1"
            />
          </label>
          <div className="buttons-settings">
            <input type="button" value="RESET" onClick={ () => this.resetQuestion() } />
            <input type="button" value="START" onClick={ () => history.push('/game') } />
          </div>
        </form>
      </>
    );
  }
}

Settings.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default connect()(Settings);
