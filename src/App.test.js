import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Header Forex Rates text', () => {
  const { getByText } = render(<App />);
  const textElement = getByText(/Forex Rates/i);
  expect(textElement).toBeInTheDocument();
});
