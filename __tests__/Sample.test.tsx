import Home from '@/app/page';
import { render, screen } from '@testing-library/react';

describe('Home Page', () => {
  it('renders the welcome message', () => {
    render(<Home />);
    const headingElement = screen.getByText(/Get started by editing/i);

    expect(headingElement).toBeInTheDocument();
  });
});