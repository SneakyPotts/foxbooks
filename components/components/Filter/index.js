import Popular from './Popular/Popular';
import CategFilter from './CategFilter/CategFilter';
import Author from './Author/Author';
import ClearAll from './Clear/Clear';
import css from './filter.module.css';

const Filters = () => {
  return (
    <div className={css.container}>
      <div className={css.options}>
        <Popular />
        <CategFilter />
        <Author />
      </div>
      <div><ClearAll /></div>
      
    </div>
  );
};
export default Filters;
