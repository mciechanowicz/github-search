import { Card, CardContent, Typography } from '@mui/material';

type Props = {
  message: string;
};

const EmptyList = ({ message }: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography component="p" textAlign="center" variant="subtitle1">
          {message}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EmptyList;
