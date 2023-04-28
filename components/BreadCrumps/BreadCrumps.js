import Link from 'next/link';

import React, { Fragment } from 'react';

import classNames from 'classnames';

import st from './breadCrumps.module.scss';

const Breadcrumbs = ({ data }) => {
  return (
    <nav className={st.container}>
      <ul className={st.crumps} itemScope itemType="https://schema.org/BreadcrumbList">
        <li className={st.dot} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <Link href="/">
            <>
              <a className={st.link} title="Главная" itemProp="item">
                <span itemProp="name">Главная</span>
              </a>
              <meta itemProp="position" content="0" />
            </>
          </Link>
        </li>

        {data?.map(({ path, title }, index) => {
          return (
            path &&
            (data?.length - 1 !== index ? (
              <Fragment key={path}>
                <li className={st.dot} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <Link href={path}>
                    <>
                      <a className={st.link} title={title} itemProp="item">
                        <span itemProp="name">{title}</span>
                      </a>
                      <meta itemProp="position" content={index + 1} />
                    </>
                  </Link>
                </li>
              </Fragment>
            ) : (
              <Fragment key={path}>
                <li className={classNames({ [st.dot]: data?.length - 1 !== index })} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <span className={st.link} title={title} itemProp="item">
                    <span itemProp="name">{title}</span>
                    <meta itemProp="position" content={index + 1} />
                  </span>
                </li>
              </Fragment>
            ))
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
