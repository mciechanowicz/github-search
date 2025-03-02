import { useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getUsers, RESULTS_PER_PAGE } from '@/services/getUsers';
import { GitHubSearchResponse, User } from '@/types/api';

const useGitHubSearch = (username: string) => {
  const [isQueryLimitReached, setIsQueryLimitReached] = useState(false);
  const query = useInfiniteQuery<
    GitHubSearchResponse,
    AxiosError,
    User[],
    readonly ['users', string],
    number
  >({
    queryKey: ['users', username] as const,
    queryFn: ({ pageParam = 1 }) => getUsers(username, pageParam),
    enabled: !!username,
    getNextPageParam: (lastPage, allPages) => {
      if (isQueryLimitReached) return undefined;
      const maxPages = Math.ceil(lastPage.total_count / RESULTS_PER_PAGE);
      const nextPage = allPages.length + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    },
    // Info for the recruiter: technique related to functional programming (usage of flatMap)
    select: (data) => data.pages.flatMap((page) => page.items),
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (error?.response?.status === 403) {
        setIsQueryLimitReached(true);
        return false;
      }
      return failureCount < 3;
    },
  });

  const handleRetry = () => {
    setIsQueryLimitReached(false);
    query.refetch();
  };

  return {
    ...query,
    hasNextPage: query.hasNextPage && !isQueryLimitReached,
    handleRetry,
  };
};

export default useGitHubSearch;
