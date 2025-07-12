import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import ContactUs from './ContactUs';
import { UserContext } from './UserContext';

const renderWithProviders = (ui, { providerProps } = {}) => {
  return render(
    <BrowserRouter>
      <UserContext.Provider value={providerProps}>
        {ui}
      </UserContext.Provider>
    </BrowserRouter>
  );
};

describe('ContactUs component tests with context and router', () => {
  test('displays user name and contact heading', () => {
    renderWithProviders(<ContactUs />, { providerProps: { name: 'Aaditya' } });

    expect(screen.getByText(/welcome, aaditya/i)).toBeInTheDocument();
    expect(screen.getByText(/contact us/i)).toBeInTheDocument();
  });

  test('renders Link to home and button', () => {
    renderWithProviders(<ContactUs />, { providerProps: { name: 'Aaditya' } });

    expect(screen.getByRole('link', { name: /go home/i })).toHaveAttribute('href', '/home');
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });
});
