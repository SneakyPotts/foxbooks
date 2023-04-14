import { useRouter } from 'next/router';

import classnames from 'classnames';

import st from './switcher.module.scss';

import List from '../shared/icons/list';
import Grid from '../shared/icons/navMenu/grid';

const Switcher = ({ flagSwitcher, setFlagSwitcher }) => {
  const router = useRouter();

  const handleClick = (value) => {
    router.push({ query: { ...router.query, ['showType']: value, page: 1 } }, null, {
      scroll: false,
    });
    // const flag = value === 'list' ? true : false
    // setFlagSwitcher(flag)
  };

  return (
    <div className={st.field}>
      <span className={classnames({ [st.ball]: flagSwitcher })} onClick={() => handleClick('list')}>
        <List className={classnames(st.iconList)} />
      </span>
      <span className={classnames({ [st.ball]: !flagSwitcher })} onClick={() => handleClick('block')}>
        <Grid className={classnames(st.iconGrid)} />
      </span>
    </div>
  );
};

export default Switcher;
