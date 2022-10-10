import type { GetServerSideProps, NextPage } from 'next';

import Layout from '@/components/common/Layout';
import { withSessionSsr } from '@/lib/iron-session';

const HomePage: NextPage = () => {
  return (
    <Layout title="Home">
      <h1>Hello world</h1>
    </Layout>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = withSessionSsr((ctx) => {
  const user = ctx.req.session.user;
  if (!user) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
});
