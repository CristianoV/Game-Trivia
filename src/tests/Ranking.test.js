import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testes da pagina de Ranking', () => {

  beforeEach(() => {
    localStorage = {};
  });

  test('01 - Testa se os elementos estão na tela', () => {
    const initialState = {
      player: {
        name: 'TestRanking',
        gravatarEmail: '',
        score: 10,
        assertions: 0,
        hash: ''
      },
    };

    const ranking = [{ name: 'TestRanking', score: 10, picture: '' }];
    localStorage.setItem('ranking', JSON.stringify(ranking));

    renderWithRouterAndRedux(<App />, initialState, "/ranking");

    const btnLogin = screen.getByRole('button', { name: /login/i });
    expect(btnLogin).toBeInTheDocument();

    const listRankingName = screen.getAllByTestId('player-name-0');
    expect(listRankingName[0]).toBeInTheDocument();

    const listRankingScore = screen.getAllByTestId('player-score-0');
    expect(listRankingScore[0]).toBeInTheDocument();
  });

  test('02 - Testa se o ranking está na ordem decrescente ', () => {
    const initialState = {
      player: {
        name: 'PLAYER_1',
        gravatarEmail: '',
        score: 10,
        assertions: 0,
        hash: ''
      },
    };

    const ranking = [
      { name: 'PLAYER_1', score: 10, picture: 'https://www.gravatar.com/avatar/' },
      { name: 'PLAYER_2', score: 100, picture: 'https://www.gravatar.com/avatar/' },
      { name: 'PLAYER_3', score: 40, picture: 'https://www.gravatar.com/avatar/' }
    ];
    localStorage.setItem('ranking', JSON.stringify(ranking));

    renderWithRouterAndRedux(<App />, initialState, "/ranking");

    const listRanking = screen.getByRole('list');
    const position1 = screen.getByTestId('player-name-0');
    expect(position1.innerHTML).toBe('PLAYER_2');
    const position2 = screen.getByTestId('player-name-1');
    expect(position2.innerHTML).toBe('PLAYER_3');
    const position3 = screen.getByTestId('player-name-2');
    expect(position3.innerHTML).toBe('PLAYER_1');
  });

  test('03 - Testa se ao clicar em Login redireciona para a pagina inicial', () => {
    const initialState = {
      player: {
        name: 'TestRanking',
        gravatarEmail: '',
        score: 10,
        assertions: 0,
        hash: ''
      },
    };

    const ranking = [{ name: 'TestRanking', score: 10, picture: '' }];
    localStorage.setItem('ranking', JSON.stringify(ranking));
    const { history } = renderWithRouterAndRedux(<App />, initialState, "/ranking");

    const btnLogin = screen.getByRole('button', { name: /login/i });
    expect(btnLogin).toBeInTheDocument();
    userEvent.click(btnLogin);
    expect(history.location.pathname).toBe('/');
  });
});
