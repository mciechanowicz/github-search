import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    height: '100vh',
    overflow: 'auto',
    py: 4,
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' },
  },
  headerTitle: {
    fontWeight: '700',
    textAlign: 'center',
    mb: 2,
  },
  textField: {
    mb: 4,
  },
};

export default styles;
