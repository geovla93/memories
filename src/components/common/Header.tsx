import type { FC } from 'react';

import Container from '../ui/Container';

const Header: FC = () => {
  return (
    <header className="sticky inset-x-0 top-0 z-20 h-14 bg-white shadow">
      <Container className="flex h-full items-center">
        <h1>Memories</h1>
      </Container>
    </header>
  );
};

export default Header;
