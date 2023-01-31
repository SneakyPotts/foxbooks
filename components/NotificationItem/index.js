import React from 'react';
import s from './styles.module.scss';
import Image from "next/image";
import AvatarWithLetter from "../shared/common/AvatarWithLetter";
import Link from 'next/link';
import moment from "moment";
import 'moment/locale/ru'

const NotificationItem = ({data}) => {
  return (
    <div className={s.wrapper}>
      <div className={s.senderAvatar}>
        {data?.sender?.avatar ? (
          <Image
            src={data?.sender?.avatar}
            alt="Avatar"
            width="35"
            height="35"
            placeholder="blur"
            blurDataURL="/blur.webp"
          />
        ) : (
          <AvatarWithLetter
            letter={
              data?.sender?.nickname?.slice(0, 1) ||
              data?.sender?.name?.slice(0, 1) ||
              'П'
            }
            width={35}
            id={data?.sender?.id}
            isProfile
          />
        )}
      </div>

      {data?.type === 'like' && (<div className={s.content}>
        <p className={s.text}>
          <span className={s.senderName}>{data?.sender?.nickname || data?.sender?.name || 'Пользователь'}</span>&nbsp;
          оценил(а) {data?.caption} о книге&nbsp;
          <Link href={`/${data?.book?.type}/some-genre/${data?.book?.slug}`}>
            <a className={s.bookLink}>{data?.book?.title}</a>
          </Link>
        </p>
        <p className={s.time}>{moment(data?.created_at).from(moment())}</p>
      </div>)}

      {data?.type === 'answer' && (
        <div className={s.content}>
          <p className={s.text}>
            <span className={s.senderName}>{data?.sender?.nickname || data?.sender?.name || 'Пользователь'}</span>&nbsp;
            {<>оставил(а) комментарий:<br/></>}
            <span className={s.textComment}>{data?.text || 'Test comment text'}</span>
          </p>
          <p className={s.time}>
            {moment(data?.created_at).from(moment())}&nbsp;
            <span className={s.text}>{data?.caption}</span>&nbsp;
            <Link href={`/${data?.book?.type}/some-genre/${data?.book?.slug}`}>
              <a className={s.bookLink}>{data?.book?.title}</a>
            </Link>
          </p>

        </div>
      )}
    </div>
  );
};

export default NotificationItem;
