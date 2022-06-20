import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';

it('check navbar is in place', () => {
  render(<App />);
  expect(screen.getByText('Мастер списков')).toBeInTheDocument();
}, 5);
