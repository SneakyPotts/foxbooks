import React from 'react';

import SupportPage from '../components/Support';

const Support = () => {
  return <SupportPage />;
};

export default Support;

export async function getServerSideProps() {
  return {
    props: {
      SEO: {
        title: `Помощь на сайте Foxbooks`,
        description: `Техническя помощь на Foxbooks`,
      },
    },
  };
}
