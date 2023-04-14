import React from 'react';
import { useSelector } from 'react-redux';

import style from './banner.module.scss';

const Banners = () => {
  const { banners } = useSelector((state) => state.adminSettings);

  return (
    <>
      {banners.length ? (
        banners.map((banner) => {
          switch (banner?.type) {
            case 'image':
              return (
                <a key={banner?.id} href={banner?.link} className={style.bannerBlock}>
                  <img src={banner?.image} alt={banner?.alt} className={style.banner} />
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
                <div key={banner?.id} className={style.bannerBlock}>
                  <img src={banner?.image} alt={banner?.alt} className={style.banner} />
                </div>
              );
          }
        })
      ) : (
        <>
          <div className={style.bannerBlock}>
            <img src="/banner.png" alt="" className={style.banner} />
          </div>
          <div className={style.bannerBlock}>
            <img src="/banner.png" alt="" className={style.banner} />
          </div>
        </>
      )}
    </>
  );
};

export default Banners;
