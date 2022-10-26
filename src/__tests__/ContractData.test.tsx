import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import ContractData from '../pages/ContractData';
import { getUserProfile, setUserProfile } from '../api/mock-api';
import store from '../app/store';
import '@testing-library/jest-dom';

test('fetch contract data and render elements on the screen', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ContractData />
      </BrowserRouter>
    </Provider>
  );
  await waitFor(
    async () => {
      await new Promise((r) => setTimeout(r, 3000));
    },
    { timeout: 8000 }
  );
  const salary = await screen.findByTestId(/salary/i);
  expect(salary).toHaveTextContent(/salary/i);
  expect(salary).toHaveTextContent(/40000/i);

  const bonus = await screen.findByTestId(/bonus/i);
  expect(bonus).toHaveTextContent(/bonus/i);
  expect(bonus).toHaveTextContent(/10000/i);

  const startDate = await screen.findByTestId(/startDate/i);
  expect(startDate).toHaveTextContent(/start date/i);
  expect(startDate).toHaveTextContent(/2021-01-19/i);
});

test('edit, cancel and save buttons work properly', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ContractData />
        </LocalizationProvider>
      </BrowserRouter>
    </Provider>
  );
  await waitFor(
    async () => {
      await new Promise((r) => setTimeout(r, 3000));
    },
    { timeout: 4000 }
  );
  const editButton = await screen.findByText(/edit/i);
  expect(editButton).toBeInTheDocument();

  fireEvent.click(editButton);

  expect(editButton).not.toBeInTheDocument();

  const cancelButton = await screen.findByText(/cancel/i);
  expect(cancelButton).toBeInTheDocument();

  const saveButton = await screen.findByText(/save/i);
  expect(saveButton).toBeInTheDocument();

  fireEvent.click(cancelButton);

  expect(cancelButton).not.toBeInTheDocument();
  expect(saveButton).not.toBeInTheDocument();
  const editButton2 = await screen.findByText(/edit/i);
  expect(editButton2).toBeInTheDocument();
});

test('change input values', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ContractData
            getProfile={getUserProfile}
            updateProfile={setUserProfile}
          />
        </LocalizationProvider>
      </BrowserRouter>
    </Provider>
  );
  await waitFor(
    async () => {
      await new Promise((r) => setTimeout(r, 3000));
    },
    { timeout: 4000 }
  );
  const editButton = await screen.findByText(/edit/i);
  fireEvent.click(editButton);

  const salaryInput = await screen.findByTestId('salary-input');
  fireEvent.change(salaryInput, {
    target: { value: '41000' },
  });
  expect(salaryInput).toHaveDisplayValue('41000');

  const bonusInput = await screen.findByTestId('bonus-input');
  fireEvent.change(bonusInput, {
    target: { value: '11000' },
  });
  expect(bonusInput).toHaveDisplayValue('11000');
});
