import React from 'react';
import { connect } from 'react-redux';
import image from '../trivia.png';

class Settings extends React.Component {
  state = {
    difficulty: ['easy', 'medium', 'hard'],
    // number: '',
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

  handleClick = ({ target }, name) => {
    const settings = JSON.parse(localStorage.getItem('settings'));
    localStorage.setItem('settings',
      JSON.stringify({ ...settings, [name]: target.id }));
  }

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
    return (
      <div>
        <header className="header">
          <div className="logo-trivia"><img src={ image } alt="logo-game" /></div>
        </header>
        <p data-testid="settings-title">Settings</p>
        <div>
          { category && category.map((item) => (
            <input
              key={ item.id }
              type="button"
              value={ item.name }
              id={ item.id }
              onClick={ (e) => this.handleClick(e, 'Category') }
            />
          ))}
        </div>
        <div>
          { difficulty && difficulty.map((item, index) => (
            <input
              key={ index }
              type="button"
              value={ item }
              id={ item }
              onClick={ (e) => this.handleClick(e, 'Difficulty') }
            />
          ))}
        </div>
        <div>
          <label htmlFor="number">
            Number of questions:
            <input
              type="number"
              name="number"
              value={ number }
              // id={ number }
              onChange={ (e) => this.hendleChange(e, 'Number') }
            />
          </label>
        </div>
        <div>
          <label htmlFor="category">
            Type:
            <select
              name="category"
              id=""
              onChange={ (e) => this.hendleChange(e, 'Type') }
            >
              <option value="">Ambas alternativas</option>
              <option value="boolean">Verdadeiro ou Falso</option>
              <option value="multiple">Múltipla Escolha</option>
            </select>
          </label>
        </div>
        <div>
          <input type="button" value="RESET" onClick={ () => this.resetQuestion() } />
        </div>
      </div>
    );
  }
}

export default connect()(Settings);
