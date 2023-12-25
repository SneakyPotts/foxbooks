import React, { memo } from 'react';

import { ProductJsonLd } from 'next-seo';

const RatingAggregator = memo(function RatingAggregator({ title, rating = 0, ratingCount = 0 }) {
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
    <ProductJsonLd
      // Це ваш оновлений JSON-LD об'єкт без екранування символів
      productName={title}
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
