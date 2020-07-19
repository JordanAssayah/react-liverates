import React from 'react';
import { render } from '@testing-library/react';
import Table from './Table';

test('renders Table component when rates data are empty', () => {
  const testEmptyRates = [];
  const { getByText } = render(<Table data={testEmptyRates} />);
  const textElement = getByText(/Currency/i);
  expect(textElement).toBeInTheDocument();
});

test('renders Table component when rates data are not empty', () => {
  const testRatesFilled = [
    {
      "currency": "USDCHF",
      "bid": "0.93869",
      "ask": "0.93886",
      "high": "0.94578",
      "low": "0.93795",
      "open": "0.94533",
      "close": "0.93869",
      "timestamp": "1595019236058"
    },
    {
      "currency": "AUDUSD",
      "bid": "0.69952",
      "ask": "0.69964",
      "high": "0.70046",
      "low": "0.69731",
      "open": "0.69758",
      "close": "0.69952",
      "timestamp": "1595019245935"
    },
    {
      "currency": "USDCAD",
      "bid": "1.35888",
      "ask": "1.35843",
      "high": "1.35882",
      "low": "1.35644",
      "open": "1.35726",
      "close": "1.35819",
      "timestamp": "1595019236174"
    }
  ];
  const { getByText } = render(<Table data={testRatesFilled} />);
  const textElement = getByText(/Currency/i);
  expect(textElement).toBeInTheDocument();
  const valueOfCell = getByText(/1.35888/i);
  expect(valueOfCell).toBeInTheDocument();
});