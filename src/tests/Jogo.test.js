import { screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import {
  questionsResponse,
  invalidTokenQuestionsResponse,
} from '../../cypress/mocks/questions';

describe('Testes da pagina de Jogo', () => {
  test('01 - Testa se os elementos estão na tela', () => {
    const initialState = {
      player: {
        name: 'TestRanking',
        gravatarEmail: 'cristiano@Trybe.com',
        score: 0,
        assertions: 0,
        hash: '123123',
      },
    };

    renderWithRouterAndRedux(<App />, initialState, '/game');
    const imgGravatarPlayer = screen.getByRole('img', {
      name: /profileimage/i,
    });
    expect(imgGravatarPlayer).toBeInTheDocument();

    const namePlayer = screen.getByText(/TestRanking/i);
    expect(namePlayer).toBeInTheDocument();

    const Timer = screen.getByRole('banner');
    within(Timer).getByText(/0/i);
    expect(Timer).toBeInTheDocument();
  });

  test('02 - Testa se as perguntas estão na tela', async () => {
    const initialState = {
      player: {
        name: 'TestRanking',
        gravatarEmail: 'cristiano@Trybe.com',
        score: 0,
        assertions: 0,
        hash: '123123',
      },
    };

    const token = [
      '980fb4b5afa7ad985827150a3a7b05e0766b62776b4be97412365c4c1156fc29',
    ];
    localStorage.setItem('token', JSON.stringify(token));

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    const { debug } = renderWithRouterAndRedux(<App />, initialState, '/game');

    await waitFor(() => {
      questionsResponse.results.map(asd => {
      const question = screen.getByTestId('question-text');
      expect(question).toBeInTheDocument();
      const timeGame = screen.getByTestId('timer');
      expect(timeGame).toBeInTheDocument();
      const correctAnswer = screen.getByTestId('correct-answer');
      expect(correctAnswer).toBeInTheDocument();
      const wrongAnswer = screen.getAllByTestId(/wrong-answer/i);
      expect(wrongAnswer[0]).toBeInTheDocument();
      userEvent.click(correctAnswer)
      expect(correctAnswer).toBeInTheDocument();
      const buttonNext = screen.getByTestId("btn-next");
      expect(buttonNext).toBeInTheDocument();
      userEvent.click(buttonNext);
      } )
      // userEvent.click(correctAnswer)
      // userEvent.click(buttonNext);
    });
  });

  test('03 - Testa se o token for invalido volta para a tela de login', async () => {
    const initialState = {
      player: {
        name: 'TestRanking',
        gravatarEmail: 'cristiano@Trybe.com',
        score: 0,
        assertions: 0,
        hash: '123123',
      },
    };

    const token = [
      '980fb4b5afa7ad985827150a3a7b05e0766b62776b4be97412365c4c1156fc29',
    ];
    localStorage.setItem('token', JSON.stringify(token));

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(invalidTokenQuestionsResponse),
    });

    const { debug, history } = renderWithRouterAndRedux(
      <App />,
      initialState,
      '/game'
    );

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });
    // debug();
  });
});
