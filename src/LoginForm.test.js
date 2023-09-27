import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';

test('renders the LoginForm component', () => {
  const { getByLabelText, getByText } = render(<LoginForm />);
  const emailInput = getByLabelText('Email');
  const passwordInput = getByLabelText('Password');
  const loginButton = getByText('Login');

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

test('validates email input', () => {
  const { getByLabelText, getByText } = render(<LoginForm />);
  const emailInput = getByLabelText('Email');
  const loginButton = getByText('Login');

  // Invalid email
  fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
  fireEvent.click(loginButton);
  expect(getByText('Invalid email address')).toBeInTheDocument();

  // Valid email
  fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
  fireEvent.click(loginButton);
  expect(getByText('Invalid email address')).not.toBeInTheDocument();
});

test('validates password input', () => {
  const { getByLabelText, getByText } = render(<LoginForm />);
  const passwordInput = getByLabelText('Password');
  const loginButton = getByText('Login');

  // Invalid password
  fireEvent.change(passwordInput, { target: { value: 'short' } });
  fireEvent.click(loginButton);
  expect(getByText('Invalid password')).toBeInTheDocument();

  // Valid password
  fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
  fireEvent.click(loginButton);
  expect(getByText('Invalid password')).not.toBeInTheDocument();
});
