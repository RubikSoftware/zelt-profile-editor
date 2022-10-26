import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import PersonalData from '../pages/PersonalData';
import { getUserProfile, setUserProfile } from '../api/mock-api';
import store from '../app/store';
import '@testing-library/jest-dom';

test('fetch personal data and render elements on the screen', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <PersonalData
          getProfile={getUserProfile}
          updateProfile={setUserProfile}
        />
      </BrowserRouter>
    </Provider>
  );
  await waitFor(
    async () => {
      await new Promise((r) => setTimeout(r, 3000));
    },
    { timeout: 8000 }
  );
  const firstName = await screen.findByTestId(/firstname/i);
  expect(firstName).toHaveTextContent(/first name/i);
  expect(firstName).toHaveTextContent(/dua/i);

  const lastName = await screen.findByTestId(/lastName/i);
  expect(lastName).toHaveTextContent(/last name/i);
  expect(lastName).toHaveTextContent(/clipa/i);

  const dob = await screen.findByTestId(/dob/i);
  expect(dob).toHaveTextContent(/Date of Birth/i);
  expect(dob).toHaveTextContent(/1995-08-22/i);
});

test('edit, cancel and save buttons work properly', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <PersonalData />
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
          <PersonalData
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

  const firstNameInput = await screen.findByTestId('firstName-input');
  fireEvent.change(firstNameInput, {
    target: { value: 'Diipa' },
  });
  expect(firstNameInput).toHaveDisplayValue('Diipa');

  const lastNameInput = await screen.findByTestId('lastName-input');
  fireEvent.change(lastNameInput, {
    target: { value: 'Clipaaa' },
  });
  expect(lastNameInput).toHaveDisplayValue('Clipaaa');
});
