import { useRouter } from 'next/router';

import classnames from 'classnames';
import { useLocalStorage } from 'usehooks-ts';

import st from './switcher.module.scss';

import List from '../shared/icons/list';
import Grid from '../shared/icons/navMenu/grid';

const Switcher = ({ flagSwitcher, setFlagSwitcher, isCategory }) => {
  const router = useRouter();

  const [showType, setShowType] = useLocalStorage('categoryShowType', 'block');

  const handleClick = (value) => {
    const showTypeSearch = isCategory ? {} : { ['showType']: value };

    router.push({ query: { ...router.query, page: 1, ...showTypeSearch } }, null, {
      scroll: false,
    });
    isCategory && setShowType(value);
  };

  return (
    <div className={st.field}>
      <span
        className={classnames({ [st.ball]: (router.query['showType'] || showType) === 'list' })}
        onClick={() => handleClick('list')}
      >
        <List className={classnames(st.iconList)} />
      </span>
      <span
        className={classnames({ [st.ball]: (router.query['showType'] || showType) === 'block' })}
        onClick={() => handleClick('block')}
      >
        <Grid className={classnames(st.iconGrid)} />
      </span>
    </div>
  );
};

export default Switcher;
