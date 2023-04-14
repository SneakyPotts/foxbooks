import Link from 'next/link';

import React from 'react';

import st from './breadCrumps.module.scss';

const Breadcrumbs = ({ data }) => {
  return (
    <nav className={st.container}>
      <ul className={st.crumps}>
        <li>
          <Link href="/">
            <a className={st.link}>Главная</a>
          </Link>
        </li>
        <li className={st.dot} />

        {data?.map(({ path, title }, index) => {
          return (
            path && (
              <React.Fragment key={path}>
                <li>
                  <Link href={path}>
                    <a className={st.link}>{title}</a>
                  </Link>
                </li>

                {data?.length - 1 !== index && <li className={st.dot} />}
              </React.Fragment>
            )
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
