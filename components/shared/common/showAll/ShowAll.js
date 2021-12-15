import st from './showAll.module.scss';
import ArrowRight from '../../../../public/chevron-right.svg';

const ShowAll = () => {
  return (
    <p className={st.showAll}>
      Показать все
      <ArrowRight className="showAll" />
    </p>
  );
};
export default ShowAll;
