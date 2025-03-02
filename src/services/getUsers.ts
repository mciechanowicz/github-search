import { api } from '@/lib/api';

import { API_ENDPOINTS } from '@/constants';
import {
  GitHubSearchResponse,
  GitHubSearchResponseBE,
  User,
} from '@/types/api';

export const RESULTS_PER_PAGE = 30;

export const getUsers = async (
  username: string,
  page: number = 1,
): Promise<GitHubSearchResponse> => {
  try {
    const response = await api.get<GitHubSearchResponseBE>(
      API_ENDPOINTS.SEARCH.USERS,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          // Authorization: `Bearer ${token}`,
        },
        params: {
          q: username,
          page,
          per_page: RESULTS_PER_PAGE,
        },
      },
    );

    const mappedUsers: User[] = response.data.items.map((user) => ({
      id: user.id,
      login: user.login,
      avatar_url: user.avatar_url,
      url: user.html_url,
    }));

    return { ...response.data, items: mappedUsers };
  } catch (error) {
    console.error('Error searching GitHub users:', error);
    throw error;
  }
};
