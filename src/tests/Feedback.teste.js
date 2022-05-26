import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
// import Feedback from '../pages/Feedback';
// import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

const initialState = {
  player: {
    name: 'Player Name',
    gravatarEmail: 'player@email.com',
    score: 0,
    assertions: 0,
  }
}

describe('Testes da pagina de Feedback', () => {
    test('01 - Testa se os elementos estão na tela', () => {

          
      renderWithRouterAndRedux(<App />, initialState, "/feedback")

    });
});
