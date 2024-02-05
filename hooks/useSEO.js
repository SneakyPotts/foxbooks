import { useRouter } from 'next/router';

const siteUrl = 'https://foxbooks.ec';
const noIndexFields = [
  'findByAuthor',
  'findByTitle',
  'findByPublisher',
  'findByCategory',
  'alphabetAuthorIndex',
  'alphabetTitleIndex',
  'selectionCategory',
  'bookType',
  'type',
];
// const canonicalFields = ['page', 'sortBy', 'showType'];

const useSEO = () => {
  const router = useRouter();

  const isReader = router.pathname === '/reader';
  const noIndex = !!findFields(router.query, noIndexFields).length;
  // const canonical = !isReader && !!findFields(router.query, canonicalFields).length;

  const cleanPath = router.asPath.split('#')[0].split('?')[0];
  const canonicalUrl = `${siteUrl}${router.asPath === '/' ? '' : cleanPath}`;

  return {
    // canonical: canonical || noIndex ? canonicalUrl : null,
    canonical: !findFields(router.query, ['page']).length && canonicalUrl,
    noIndex: isReader || noIndex,
  };
};

export default useSEO;

function findFields(object, fields) {
  const result = [];

  for (let field of fields) {
    if (Object.hasOwn(object, field)) {
      result.push(field);
    }
  }

  return result;
}
