import { Image } from 'next/image';

import React from 'react';
import { useSelector } from 'react-redux';

import style from './banner.module.scss';

const Banners = ({ type = 'aside' }) => {
  const { banners } = useSelector((state) => state.adminSettings);

  return (
    <>
      {banners[type]?.length ? (
        banners[type]?.map((banner) => {
          switch (banner?.type) {
            case 'image':
              return (
                <a
                  key={banner?.id}
                  href={banner?.link}
                  className={style.bannerBlock}
                >
                  <img
                    src={banner?.image}
                    alt={banner?.alt}
                    className={style.banner}
                  />
                </a>
              );
            case 'active':
              return (
                <React.Fragment key={banner?.id}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: banner?.content,
                    }}
                  />
                </React.Fragment>
              );
            default:
              return (
                <div
                  key={banner?.id}
                  className={style.bannerBlock}
                >
                  <img
                    src={banner?.image}
                    alt={banner?.alt}
                    className={style.banner}
                  />
                </div>
              );
          }
        })
      ) : (
        <>
          {type === 'aside' ? (
            <>
              <div className={style.bannerBlock}>
                <img
                  src="/banner.png"
                  alt=""
                  className={style.banner}
                />
              </div>
              <div className={style.bannerBlock}>
                <img
                  src="/banner.png"
                  alt=""
                  className={style.banner}
                />
              </div>
            </>
          ) : (
            <img
              src="/horizontalBookCovers/bookCover1.png"
              alt=""
              width={588}
              height={250}
              className={style.bannerContent}
            />
          )}
        </>
      )}
    </>
  );
};

export default Banners;

//CONTENT BANNER
/*
*             <Image
                src="/horizontalBookCovers/bookCover1.png"
                alt=""
                width={588}
                height={250}
                className={st.relatedInfoBanner}
              />
* */
