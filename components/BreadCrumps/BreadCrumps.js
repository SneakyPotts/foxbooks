import Link from 'next/link';

import React from 'react';

import classNames from 'classnames';

import st from './breadCrumps.module.scss';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL.slice(0, process.env.NEXT_PUBLIC_APP_URL.length - 1);

const Breadcrumbs = ({ data }) => {
  return (
    <nav className={st.container}>
      <ul
        className={st.crumps}
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          className={st.dot}
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link href="/">
            <a
              className={st.link}
              title="Главная"
              itemProp="item"
              itemID={`${baseUrl}/`}
            >
              <span itemProp="name">Главная</span>
              <meta
                itemProp="position"
                content="0"
              />
            </a>
          </Link>
        </li>

        {data?.map(({ path, title }, index) => {
          return (
            path && (
              // (data?.length - 1 !== index ? (
              <li
                key={`${path}${title}_${index}`}
                className={classNames({ [st.dot]: data?.length - 1 !== index })}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <Link href={path}>
                  <a
                    className={st.link}
                    title={title}
                    itemProp="item"
                    itemID={`${baseUrl}${path}`}
                  >
                    <span itemProp="name">{title}</span>
                    <meta
                      itemProp="position"
                      content={index + 1}
                    />
                  </a>
                </Link>
              </li>
            )
            // ) : (
            //   <li
            //     key={path}
            //     className={classNames({ [st.dot]: data?.length - 1 !== index })}
            //     itemProp="itemListElement"
            //     itemScope
            //     itemType="https://schema.org/ListItem"
            //   >
            //     <span
            //       className={st.link}
            //       title={title}
            //       itemProp="item"
            //       itemID={`${baseUrl}${path}`}
            //     >
            //       <span itemProp="name">{title}</span>
            //       <meta
            //         itemProp="position"
            //         content={index + 1}
            //       />
            //     </span>
            //   </li>
            // ))
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
