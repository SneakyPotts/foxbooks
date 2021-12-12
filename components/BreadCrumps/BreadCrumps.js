import React from 'react';
import Link from 'next/link';
import st from './breadCrumps.module.scss';
// import { useRouter } from 'next/router';

const Breadcrumbs = ({ data }) => {
  return (
    <nav className={st.container}>
      <ul className={st.crumps}>
        <li>
          <Link href="/">
            <a>Главная</a>
          </Link>
        </li>
        <li className={st.dot}></li>

        {data.map(({ path, label }, i) => {
          return (
            path && (
              <React.Fragment key={i}>
                <li>
                  <Link href={path}>
                    <a>{label}</a>
                  </Link>
                </li>

                {data.length - 1 !== i && <li>/</li>}
              </React.Fragment>
            )
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
