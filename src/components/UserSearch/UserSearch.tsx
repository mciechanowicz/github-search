import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useDebounce } from 'use-debounce';

import styles from '@/components/UserSearch/styles';

import { DEBOUNCE_DELAY } from '@/constants';
import useGitHubSearch from '@/hooks/useGithubSearch';
import { searchSchema } from '@/schemas/search';
import { translations } from '@/translations';

import UserList from '../UserList/UserList';

const UserSearch = () => {
  const {
    register,
    watch,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(searchSchema),
    mode: 'onChange',
  });

  const username = watch('username');
  const [debouncedUsername] = useDebounce(username, DEBOUNCE_DELAY);
  const {
    data,
    isLoading: isQueryLoading,
    error,
    hasNextPage,
    fetchNextPage,
  } = useGitHubSearch(isValid ? debouncedUsername : '');

  const isInputPending = isValid && username !== debouncedUsername;
  const isLoading = isInputPending || isQueryLoading;

  return (
    <Box sx={styles.container}>
      <Typography component="h1" variant="h3" sx={styles.headerTitle}>
        {translations.userSearch.title}
      </Typography>
      <TextField
        {...register('username')}
        label={translations.userSearch.textFieldLabel}
        size="small"
        fullWidth
        error={!!errors.username}
        helperText={errors.username?.message}
        sx={styles.textField}
        slotProps={{
          input: {
            endAdornment: isLoading ? (
              <InputAdornment position="end">
                <CircularProgress size={20} />
              </InputAdornment>
            ) : null,
          },
        }}
      />
      <Typography>{errors.username?.message}</Typography>
      <UserList
        users={data || []}
        isLoading={isLoading}
        error={error}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </Box>
  );
};

export default UserSearch;
