import Books from '../../components/MyBooks/Books';

import MyBooksLayout from '../../components/shared/common/specific/MyBooksLayout';

const MyBooksPage = () => {
  return <Books isAudio />;
};

MyBooksPage.getLayout = function getLayout(page) {
  return <MyBooksLayout>{page}</MyBooksLayout>;
};

export default MyBooksPage;

export async function getServerSideProps({ req }) {
  const { cookies } = req;
  const token = cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/',
        parameter: false,
      },
    };
  }

  return {
    props: {},
  };
}
