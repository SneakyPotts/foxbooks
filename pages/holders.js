import React from 'react';

import HoldersRight from '../components/Holders';

const Holders = () => {
  return <HoldersRight />;
};

export default Holders;

export async function getServerSideProps() {
  return {
    props: {
      SEO: {
        title: `Жалобы на материал`,
        description: `Жалобы на материал`,
      },
    },
  };
}
