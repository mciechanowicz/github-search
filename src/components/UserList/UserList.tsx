import InfiniteScroll from 'react-infinite-scroller';

import { Box } from '@mui/material';
import { AxiosError } from 'axios';

import EmptyList from '@/components/EmptyList';
import ErrorFallback from '@/components/ErrorFallback';
import LoadingIndicator from '@/components/LoadingIndicator';
import UserCard from '@/components/UserCard/UserCard';
import LimitReached from '@/components/UserList/LimitReached';
import styles from '@/components/UserList/UserList.styles';

import { translations } from '@/translations';
import { User } from '@/types/api';

type Props = {
  users: User[];
  isLoading: boolean;
  error: AxiosError | null;
  hasNextPage: boolean;
  onFetchNextPage: () => void;
  onRetry: () => void;
};

const UserList = ({
  users,
  isLoading,
  error,
  hasNextPage,
  onFetchNextPage,
  onRetry,
}: Props) => {
  if (error && error.status !== 403) return <ErrorFallback error={error} />;
  if (users.length === 0 && !isLoading)
    return <EmptyList message={translations.userList.emptyList} />;

  const limitReached = error && error.status === 403;

  return (
    <InfiniteScroll
      pageStart={0}
      hasMore={hasNextPage}
      loadMore={onFetchNextPage}
      useWindow={false}
      loader={
        <LoadingIndicator
          boxStyles={styles.infiniteScrollLoader}
          key="loader"
        />
      }>
      <Box gap={2} display="flex" flexDirection="column">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Box>
      {limitReached && <LimitReached onRetry={onRetry} />}
    </InfiniteScroll>
  );
};

export default UserList;
