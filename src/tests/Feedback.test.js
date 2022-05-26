import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
// import Feedback from '../pages/Feedback';
import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

describe('Testes da pagina de Feedback', () => {
    test('01 - Testa se os elementos estão na tela', () => {    
      const initialState = {
        player: {
          name: 'Player Name',
          gravatarEmail: 'player@email.com',
          score: 0,
          assertions: 0,
          hash: '123123',
        }
      }     
      renderWithRouterAndRedux(<App />, initialState, "/feedback")
      const scorePlayerFrase = screen.getByText(/Could be better/i)
      expect(scorePlayerFrase).toBeInTheDocument();
      const namePlayer = screen.getByText(/Player Name/i)
      expect(namePlayer).toBeInTheDocument();
      const srcImage = screen.getByRole('img', {
        name: /avatar do player/i
      })
      expect(srcImage).toBeInTheDocument();
      expect(srcImage.src).toBe(`https://www.gravatar.com/avatar/${initialState.player.hash}`)
    });
});
