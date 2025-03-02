import {
  Avatar,
  Box,
  Card,
  CardContent,
  Link,
  Typography,
} from '@mui/material';

import styles from '@/components/UserCard/styles';

import { translations } from '@/translations';
import { User } from '@/types/api';

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <Card>
      <CardContent sx={styles.cardContent}>
        <Box gap={1} display="flex" alignItems="center" flex={1}>
          <Avatar
            sx={styles.avatar}
            src={user.avatar_url}
            alt={`${user.login} avatar`}
          />
          <Box>
            <Typography>{user.login}</Typography>
            <Typography sx={styles.userUrlStyle}>{user.url}</Typography>
          </Box>
        </Box>
        <Link
          sx={styles.link}
          href={user.url}
          target="_blank"
          rel="noopener noreferrer">
          {translations.userList.linkTitle}
        </Link>
      </CardContent>
    </Card>
  );
};

export default UserCard;
