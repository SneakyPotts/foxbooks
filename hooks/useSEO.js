import { useRouter } from 'next/router';

import React from 'react';

const useSEO = () => {
  const router = useRouter();

  const siteUrl = 'https://foxbooks.ec';

  const cleanPath = router.asPath.split('#')[0].split('?')[0];
  const canonicalUrl = `${siteUrl}${router.asPath === '/' ? '' : cleanPath}`;

  const fieldsCanonical = Object.keys(router.query);
  const canonicalFields = fieldsCanonical.includes('page') || fieldsCanonical.includes('sortBy') || fieldsCanonical.includes('showType');

  const fieldsNoindex = Object.keys(router.query);
  const robotsFields = fieldsNoindex.includes('findByAuthor') || fieldsNoindex.includes('findByTitle') || fieldsNoindex.includes('findByPublisher');

  return {
    canonical: canonicalFields ? canonicalUrl : null,
    noIndex: robotsFields,
  };
};

export default useSEO;
