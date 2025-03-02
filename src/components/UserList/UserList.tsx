import InfiniteScroll from 'react-infinite-scroller';

import { Box, CircularProgress } from '@mui/material';

import EmptyList from '@/components/EmptyList';
import ErrorFallback from '@/components/ErrorFallback';
import UserCard from '@/components/UserCard/UserCard';

import { translations } from '@/translations';
import { User } from '@/types/api';

type Props = {
  users: User[];
  isLoading: boolean;
  error: Error | null;
  hasNextPage: boolean;
  fetchNextPage: () => void;
};

const UserList = ({
  users,
  isLoading,
  error,
  hasNextPage,
  fetchNextPage,
}: Props) => {
  if (error) return <ErrorFallback error={error} />;
  if (users.length === 0 && !isLoading)
    return <EmptyList message={translations.userList.emptyList} />;

  return (
    <InfiniteScroll
      pageStart={0}
      hasMore={hasNextPage}
      loadMore={fetchNextPage}
      useWindow={false}
      loader={<CircularProgress key="loader" />}>
      <Box gap={2} display="flex" flexDirection="column">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Box>
    </InfiniteScroll>
  );
};

export default UserList;
