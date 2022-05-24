import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Login from '../pages/Login';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Testes do componente Login', () => {
  test('01 - Testa se os elementos estão na tela', () => {
    renderWithRouterAndRedux(<Login />)
    const email = screen.getByLabelText(/e-mail/i);
    const name = screen.getByLabelText(/name/i);
    const btnPlay = screen.getByRole('button', { name: /play/i });
    const btnSet = screen.getByRole('button', { name: /settings/i });
    expect(email).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(btnPlay).toBeInTheDocument();
    expect(btnSet).toBeInTheDocument();
  });


  test('02 - Testa se o botão Play é habilitado ao digitar nos inputs', () => {
    renderWithRouterAndRedux(<Login />)
    const email = screen.getByLabelText(/e-mail/i);
    const name = screen.getByLabelText(/name/i);
    const btnPlay = screen.getByRole('button', { name: /play/i });
    expect(btnPlay.disabled).toBe(true);
    userEvent.type(name, 'Jeazi');
    userEvent.type(email, 'jeazi_ricardo@hotmail.com');
    expect(name.value).toBe('Jeazi');
    expect(email.value).toBe('jeazi_ricardo@hotmail.com');
    expect(btnPlay.disabled).toBe(false);
  });
});