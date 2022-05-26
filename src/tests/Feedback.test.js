import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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


    test('02 - Testa se a frase do score esta correta', () => {    
      const initialState = {
        player: {
          name: 'Player Name',
          gravatarEmail: 'player@email.com',
          score: 3,
          assertions: 0,
          hash: '123123',
        }
      }     
      renderWithRouterAndRedux(<App />, initialState, "/feedback")
      const scorePlayerFrase = screen.queryByText(/Could be better/i)
      expect(scorePlayerFrase).not.toBeInTheDocument();
      
    });


    test('03 - testando o redirecionamento do botão Play Again', () => {    
      const initialState = {
        player: {
          name: 'Player Name',
          gravatarEmail: 'player@email.com',
          score: 3,
          assertions: 0,
          hash: '123123',
        }
      }     
      const {history} = renderWithRouterAndRedux(<App />, initialState, "/feedback")
      const playAgainButton = screen.getByRole('button', {
        name: /play again/i
      })
      expect(playAgainButton).toBeInTheDocument();
      userEvent.click(playAgainButton);
      const { pathname } = history.location;
      expect(pathname).toBe('/game');
   
    });

    
    test('04 - testando o redirecionamento do botão Rankig', () => {    
      const initialState = {
        player: {
          name: 'Player Name',
          gravatarEmail: 'player@email.com',
          score: 3,
          assertions: 0,
          hash: '123123',
        }
      }     
      const {history} = renderWithRouterAndRedux(<App />, initialState, "/feedback")
      const buttonRanking = screen.getByRole('button', {
        name: /ranking/i
      })
      expect(buttonRanking).toBeInTheDocument();
      const { pathname } = history.location;
      expect(pathname).toBe('/ranking');
    });
});
