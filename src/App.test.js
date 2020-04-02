import React from 'react';
import { render } from '@testing-library/react';
import TodoApp from './App';

test('renders a label', () => {
  const { getByText } = render(<TodoApp />);
  const labelElement = getByText(/What needs/i);
  expect(labelElement).toBeInTheDocument();
});

test('renders Github link', () => {
  const { getByText } = render(<TodoApp />);
  const linkElement = getByText(/Github/i);
  expect(linkElement).toBeInTheDocument();
});
