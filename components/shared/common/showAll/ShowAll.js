import Link from 'next/link';
import classNames from 'classnames';
import st from './showAll.module.scss';
import ArrowRight from '../../../../public/chevron-right.svg';
import ArrowAll from '../../../../public/chevron-down.svg';

const ShowAll = ({
  text = 'Смотреть все',
  title,
  url = '/',
  externalClass,
  arrowSecondary
}) => {
  return (
    <div className={classNames(st.showAll, externalClass)}>
      {title && <h3 className={st.showAllTitle}>{title}</h3>}
      <Link href={url}>
        <a className={st.showAllLink}>
          {text}
          {arrowSecondary ?
            <span className={st.iconAll}>
              <ArrowAll className={st.arrowAll} />
            </span>
            :
            <ArrowRight className={st.test} />
          }
        </a>
      </Link>
    </div>
  );
};
export default ShowAll;
