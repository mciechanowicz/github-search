import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UserSearch from '@/components/UserSearch/UserSearch';

import useGitHubSearch from '@/hooks/useGithubSearch';
import { translations } from '@/translations';

jest.mock('@/hooks/useGithubSearch', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseGitHubSearch = useGitHubSearch as jest.Mock;

describe('UserSearch', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    queryClient.clear();

    mockUseGitHubSearch.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      hasNextPage: false,
      fetchNextPage: jest.fn(),
      handleRetry: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays validation error when username is too short', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserSearch />
      </QueryClientProvider>,
    );

    const input = screen.getByLabelText(translations.userSearch.textFieldLabel);

    await userEvent.type(input, 'a');

    await waitFor(() => {
      const errorMessage = screen.getByText(
        translations.userSearch.textFieldUsernameMin,
      );
      expect(errorMessage).toBeInTheDocument();
    });

    expect(mockUseGitHubSearch).not.toHaveBeenCalledWith('a');
  });

  it('passes users data to UserList after valid input', async () => {
    const mockUsers = [
      {
        id: 1,
        login: 'testuser1',
        avatar_url: 'https://example.com/avatar1',
        url: 'https://github.com/testuser1',
      },
      {
        id: 2,
        login: 'testuser2',
        avatar_url: 'https://example.com/avatar2',
        url: 'https://github.com/testuser2',
      },
    ];

    render(
      <QueryClientProvider client={queryClient}>
        <UserSearch />
      </QueryClientProvider>,
    );

    const input = screen.getByLabelText(translations.userSearch.textFieldLabel);

    expect(screen.queryByText(mockUsers[0].login)).not.toBeInTheDocument();
    expect(screen.queryByText(mockUsers[1].login)).not.toBeInTheDocument();

    mockUseGitHubSearch.mockReturnValue({
      data: mockUsers,
    });

    await userEvent.type(input, 'test');

    await waitFor(() => {
      expect(screen.getByText(mockUsers[0].login)).toBeInTheDocument();
      expect(screen.getByText(mockUsers[1].login)).toBeInTheDocument();
    });
  });

  it('displays loading state when fetching data', async () => {
    mockUseGitHubSearch.mockReturnValue({
      isLoading: true,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <UserSearch />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });

  it('displays error message when fetching data fails', async () => {
    const error = new Error('Someting went wrong.');
    mockUseGitHubSearch.mockReturnValue({
      error,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <UserSearch />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(error.message)).toBeInTheDocument();
    });
  });

  it('displays empty list message when no users are found', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserSearch />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(
        screen.getByText(translations.userList.emptyList),
      ).toBeInTheDocument();
    });
  });
});
