import { Box, CircularProgress, CircularProgressProps } from '@mui/material';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

type Props = {
  boxStyles?: SxProps<Theme>;
  color?: CircularProgressProps['color'];
  size?: CircularProgressProps['size'];
};
const LoadingIndicator = ({
  boxStyles,
  color = 'primary',
  size = 40,
}: Props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      sx={boxStyles}>
      <CircularProgress color={color} size={size} />
    </Box>
  );
};

export default LoadingIndicator;
