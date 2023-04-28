import React, { memo } from 'react';

const RatingAggregator = memo(function RatingAggregator({ rating = 0, ratingCount = 0 }) {
  return (
    <script type="application/ld+json" className="reviews-schema">
      {`
          {
            "@context": "http://schema.org",
            "@type": "Product",
            "name": "Star rating snippet aggregator",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "${rating}",
              "bestRating": "5",
              "reviewCount": "${ratingCount}"
            }
          }
        `}
    </script>
  );
});

export default RatingAggregator;
