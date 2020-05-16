import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';

import Layout, { siteTitle } from '@components/Layout';
import { api } from '@config/axios/api';
import { getSortedPostsData } from '@lib/posts';
import utilStyles from '@styles/utils.module.css';
import Date from '@components/Date';

interface HomeProps {
  avatar_url: string;
  bio: string;
  name: string;
  allPostsData: {
    id: string;
    date: string;
    title: string;
  }[];
}

const Home: React.FC<HomeProps> = ({ avatar_url, bio, name, allPostsData }) => {
  return (
    <Layout home name={name} imageSource={avatar_url}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>{bio}</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href='https://nextjs.org/learn'>our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href='/posts/[id]' as={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (): Promise<{
  props: HomeProps;
}> => {
  const { data } = await api.get('users/monica-santos');
  const allPostsData = getSortedPostsData();

  return { props: { ...data, allPostsData } };
};

export default Home;
