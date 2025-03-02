import { useInfiniteQuery } from '@tanstack/react-query';

import { getUsers, RESULTS_PER_PAGE } from '@/services/getUsers';
import { GitHubSearchResponse, User } from '@/types/api';

const useGitHubSearch = (username: string) => {
  return useInfiniteQuery<
    GitHubSearchResponse,
    Error,
    User[],
    readonly ['users', string],
    number
  >({
    queryKey: ['users', username] as const,
    queryFn: ({ pageParam = 1 }) => getUsers(username, pageParam),
    enabled: !!username,
    getNextPageParam: (lastPage, allPages) => {
      const maxPages = Math.ceil(lastPage.total_count / RESULTS_PER_PAGE);
      const nextPage = allPages.length + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    },
    // Info for the recruiter: technique related to functional programming (usage of flatMap)
    select: (data) => data.pages.flatMap((page) => page.items),
    initialPageParam: 1,
  });
};

export default useGitHubSearch;
