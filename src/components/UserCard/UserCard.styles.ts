import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  cardContent: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    objectFit: 'cover',
  },
  userUrlStyle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: { xs: '250px', sm: '100%' },
    color: '#64748b',
    '&:hover': {
      color: '#000000',
    },
  },
  link: {
    display: { xs: 'none', sm: 'block' },
  },
};

export default styles;
