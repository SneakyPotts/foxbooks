import classnames from 'classnames';
import List from '../../public/list.svg';
import Grid from '../../public/grid.svg';
import st from './switcher.module.scss';

const Switcher = ({ flagSwitcher, setFlagSwitcher }) => {
  return (
    <div className={st.field}>
      <span
        className={classnames({ [st.ball]: !flagSwitcher })}
        onClick={() => setFlagSwitcher(false)}
      >
        <List className={classnames(st.iconList)} />
      </span>
      <span
        className={classnames({ [st.ball]: flagSwitcher })}
        onClick={() => setFlagSwitcher(true)}
      >
        <Grid className={classnames(st.iconGrid)} />
      </span>
    </div>
  );
};

export default Switcher;
