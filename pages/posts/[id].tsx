import Head from 'next/head';
import Layout from '@components/Layout';
import { getAllPostIds, getPostData, PostData } from '@lib/posts';
import Date from '@components/Date';
import UtilStyle from '@styles/utils.module.css';

interface PostProps {
  postData: PostData;
}

const Post: React.FC<PostProps> = ({
  postData: { id, date, title, htmlContent },
}) => {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <h1 className={UtilStyle.headingXl}>{title}</h1>
        <div className={UtilStyle.lightText}>
          <Date dateString={date} />
        </div>
        <br />
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </article>
    </Layout>
  );
};

/**
 * This function defines whats values can be used on the route params
 * Current route: /posts/:id
 * paths: ['ssg-ssr', 'pre-rendering']
 * fallback set to false to return 404 page to unknown routes
 */
export const getStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

interface GetStaticPropsParams {
  params: {
    id: string;
  };
}

export const getStaticProps = async ({ params }: GetStaticPropsParams) => {
  const postData = await getPostData(params.id);
  return {
    props: { postData },
  };
};

export default Post;
