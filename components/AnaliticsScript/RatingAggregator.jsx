import { useRouter } from 'next/router';

import React, { memo } from 'react';

import { WebPageJsonLd } from 'next-seo';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL.slice(0, process.env.NEXT_PUBLIC_APP_URL.length - 1);

const RatingAggregator = memo(function RatingAggregator({ book, type }) {
  const router = useRouter();
  const audio = type === 'audioBooks';

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
    <WebPageJsonLd
      // Це ваш оновлений JSON-LD об'єкт без екранування символів
      id={`${baseUrl}${router.asPath}`}
      openGraph={{
        '@context': 'http://schema.org',
        '@type': 'Product',
        name: `${audio ? 'Аудиокнига' : 'Книга'} ${book?.title}${!!book?.authors?.length ? ` - ${book?.authors[0]?.author}` : ''} ${audio ? '' : ' - читать онлайн'}`,
        description: book?.text || book?.description || 'Нет описания',
        primaryImageOfPage: book?.cover_url,
        mainEntity: {
          '@type': 'Book',
          author: {
            '@type': 'Person',
            name: `${book?.authors[0]?.author}`,
            '@id': `${baseUrl}/author/${book?.authors[0]?.slug}`,
          },
        },
        bookFormat: 'https://schema.org/EBook',
        datePublished: book?.created_at,
        image: book?.cover_url,
        inLanguage: {
          '@type': 'Language',
          name: 'Russian', // Название языка согласно этого формата https://en.wikipedia.org/wiki/IETF_language_tag
          alternateName: 'ru', // Сабтег языка согласно этого формата https://en.wikipedia.org/wiki/IETF_language_tag
        },
        // Указываем эту характеристику только для печатных книг
        publisher: {
          '@type': 'Organization',
          name: book?.publishers[0]?.publisher,
        },

        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: `${!!book?.rate_avg ? book?.rate_avg : Math.floor(Math.random() * 5) + 1}`,
          bestRating: '5',
          reviewCount: `${!!book?.rates_count ? book?.rates_count : Math.floor(Math.random() * 5) + 1}`,
        },
      }}
    />
  );
});

export default RatingAggregator;
