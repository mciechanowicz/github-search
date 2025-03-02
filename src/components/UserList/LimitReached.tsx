import { Box, Button, Typography } from '@mui/material';

import { translations } from '@/translations';

type Props = {
  onRetry: () => void;
};

const LimitReached = ({ onRetry }: Props) => {
  return (
    <Box
      mt={2}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column">
      <Typography color="error" gap={1}>
        {translations.userList.requestLimitReached}
      </Typography>
      <Button variant="contained" onClick={onRetry}>
        {translations.userList.fetchMoreButton}
      </Button>
    </Box>
  );
};

export default LimitReached;
