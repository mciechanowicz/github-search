'use client';

import { Container } from '@mui/material';

import UserSearch from '@/components/UserSearch/UserSearch';

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <UserSearch />
    </Container>
  );
};

export default HomePage;
