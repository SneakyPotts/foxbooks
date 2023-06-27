import { useRouter } from 'next/router';

import Close from '../../../public/clear.svg';

import css from './clear.module.css';

const ClearAll = () => {
  const router = useRouter();

  const handleClear = () => {
    router.push('/', null, { scroll: false });
  };

  return (
    <button
      className={css.clearAll}
      onClick={handleClear}
    >
      Очистить все
      <Close className={css.clearIcon} />
    </button>
  );
};

export default ClearAll;
