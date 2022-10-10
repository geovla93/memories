import type { NextPage } from 'next';

import Layout from '@/components/common/Layout';
import Container from '@/components/ui/Container';

const LoginPage: NextPage = () => {
  return (
    <Layout title="Login">
      <Container>
        <h1>Login</h1>
      </Container>
    </Layout>
  );
};

export default LoginPage;
