import { useRouter } from 'next/router';

import React, { memo } from 'react';

import { removeQuotesAndTags, secondsToISO8601Duration } from '../../utils';
import { WebPageJsonLd } from 'next-seo';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL.slice(0, process.env.NEXT_PUBLIC_APP_URL.length - 1);

const RatingAggregator = memo(function RatingAggregator({ book, type }) {
  const router = useRouter();

  const audio = type === 'audioBooks';
  const fullName = `${audio ? 'Аудиокнига' : 'Книга'} ${book?.title}${!!book?.authors?.length ? ` - ${book?.authors[0]?.author}` : ''} ${audio ? '' : ' - читать онлайн'}`;

  const randomNum = Math.floor(Math.random() * 5) + 1;

  const typeFields = audio
    ? {
        readBy: {
          '@type': 'Person',
          name: book?.actors[0]?.name,
        },
        duration: secondsToISO8601Duration(book?.total_duration || 1),
        // Длительность аудиокниги в формете https://en.wikipedia.org/wiki/ISO_8601 раздел Durations (P[YYYY]-[MM]-[DD]T[hh]:[mm]:[ss])
      }
    : {
        publisher: {
          '@type': 'Organization',
          name: book?.publishers[0]?.publisher,
        },
        datePublished: book?.created_at,
      };

  return (
    <WebPageJsonLd
      id={`${baseUrl}${router.asPath}`}
      openGraph={{
        '@context': 'http://schema.org',
        '@type': 'Product',
        name: fullName,
        description: removeQuotesAndTags(book?.text || book?.description) || 'Нет описания',
        primaryImageOfPage: book?.cover_url,
        mainEntity: {
          '@type': audio ? 'Audiobook' : 'Book',
          author: {
            '@type': 'Person',
            name: book?.authors[0]?.author,
            '@id': `${baseUrl}/author/${book?.authors[0]?.slug}`,
          },
          bookFormat: audio ? 'https://schema.org/AudiobookFormat' : 'https://schema.org/EBook',
          image: book?.cover_url,
          inLanguage: {
            '@type': 'Language',
            name: 'Russian', // Название языка согласно этого формата https://en.wikipedia.org/wiki/IETF_language_tag
            alternateName: 'ru', // Сабтег языка согласно этого формата https://en.wikipedia.org/wiki/IETF_language_tag
          },
          name: fullName,
          description: removeQuotesAndTags(book?.text || book?.description) || 'Нет описания',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: !!book?.rate_avg ? book?.rate_avg : randomNum,
            bestRating: '5',
            reviewCount: !!book?.rates_count ? book?.rates_count : randomNum,
          },
          ...typeFields,
        },
      }}
    />
  );
});

export default RatingAggregator;

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
