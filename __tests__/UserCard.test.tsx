import { render, screen } from '@testing-library/react';

import UserCard from '@/components/UserCard/UserCard';

import { translations } from '@/translations';

describe('UserCard', () => {
  const mockUser = {
    id: 1,
    login: 'testuser',
    avatar_url: 'https://test.url',
    url: 'https://github.com/testuser',
  };

  it('renders user data correctly', () => {
    render(<UserCard user={mockUser} />);

    expect(screen.getByText('testuser')).toBeInTheDocument();

    expect(screen.getByText(mockUser.url)).toBeInTheDocument();

    const link = screen.getByRole('link', {
      name: translations.userList.linkTitle,
    });
    expect(link).toHaveAttribute('href', mockUser.url);

    const avatar = screen.getByRole('img', { name: /testuser avatar/i });
    expect(avatar).toHaveAttribute('src', mockUser.avatar_url);
  });
});
