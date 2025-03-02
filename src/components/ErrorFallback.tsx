import { Box, Button, Typography } from '@mui/material';

import { translations } from '@/translations';

type Props = {
  error: string | Error;
  onRetry?: () => void;
};

const ErrorFallback = ({ error, onRetry }: Props) => {
  const errorMessage = typeof error === 'string' ? error : error.message;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}>
      <Typography color="error">{errorMessage}</Typography>
      {onRetry && (
        <Button variant="outlined" onClick={onRetry}>
          {translations.common.retry}
        </Button>
      )}
    </Box>
  );
};

export default ErrorFallback;
