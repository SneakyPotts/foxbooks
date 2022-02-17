import Link from 'next/link';
import classNames from 'classnames';
import st from './showAll.module.scss';
import ArrowRight from '../../../../public/chevron-right.svg';

const ShowAll = ({
  text = 'Смотреть все',
  title,
  url = '/',
  externalClass,
}) => {
  return (
    <div className={classNames(st.showAll, externalClass)}>
      {title && <h3 className={st.showAllTitle}>{title}</h3>}
      <Link href={url}>
        <a className={st.showAllLink}>
          {text}
          <ArrowRight className={st.test} />
        </a>
      </Link>
    </div>
  );
};
export default ShowAll;
