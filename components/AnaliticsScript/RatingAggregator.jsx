import React, { memo } from 'react';

import { JsonLd } from 'next-seo/lib/jsonld/jsonld';

const RatingAggregator = memo(function RatingAggregator({ rating = 0, ratingCount = 0 }) {
  return (
    // <script
    //   type="application/ld+json"
    //   className="reviews-schema"
    // >
    //   {`
    //       {
    //         "@context": "http://schema.org",
    //         "@type": "Product",
    //         "name": "Star rating snippet aggregator",
    //         "aggregateRating": {
    //           "@type": "AggregateRating",
    //           "ratingValue": "${rating}",
    //           "bestRating": "5",
    //           "reviewCount": "${ratingCount}"
    //         }
    //       }
    //     `}
    // </script>
    <JsonLd
      // Це ваш оновлений JSON-LD об'єкт без екранування символів
      scriptKey="product"
      openGraph={{
        '@context': 'http://schema.org',
        '@type': 'Product',
        name: 'Star rating snippet aggregator',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: `${rating}`,
          bestRating: '5',
          reviewCount: `${ratingCount}`,
        },
      }}
    />
  );
});

export default RatingAggregator;
