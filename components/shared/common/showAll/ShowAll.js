import Link from 'next/link';

import ArrowAll from '../../../../public/chevron-down.svg';
import ArrowRight from '../../../../public/chevron-right.svg';
import classNames from 'classnames';

import st from './showAll.module.scss';

const ShowAll = ({ text = 'Смотреть все', title, url = '/', externalClass, arrowSecondary, showMore = null, setPage }) => {
  if (showMore) {
    const handleChange = () => {
      setPage((prev) => prev + 1);
    };

    return (
      <div className={classNames(st.showAll, { [st.showMoreBtn]: showMore })}>
        {title && <h2 className={'title'}>{title}</h2>}
        <button type={'button'} onClick={handleChange}>
          <a className={st.showAllLink}>
            {text}
            {arrowSecondary ? (
              <span className={st.iconAll}>
                <ArrowAll className={st.arrowAll} />
              </span>
            ) : (
              <ArrowRight className={st.test} />
            )}
          </a>
        </button>
      </div>
    );
  }

  return (
    <div className={classNames(st.showAll, externalClass)}>
      {title && <h2 className={'title'}>{title}</h2>}
      <Link href={url}>
        <a className={st.showAllLink}>
          {text}
          {arrowSecondary ? (
            <span className={st.iconAll}>
              <ArrowAll className={st.arrowAll} />
            </span>
          ) : (
            <ArrowRight className={st.test} />
          )}
        </a>
      </Link>
    </div>
  );
};
export default ShowAll;
