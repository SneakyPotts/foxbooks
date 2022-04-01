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

      <div className={s.content}>
        <p className={s.text}>
          <span className={s.senderName}>{data?.sender?.nickname || data?.sender?.name || 'Пользователь'}</span>&nbsp;
          {data?.type === 'like' ? 'оценил(а) ' : 'оставил(а) уомментарий на '}вашу рецензию о книге&nbsp;
          <Link href={`/book/${data?.book?.id}?type=${data?.book?.type}`}>
            <a className={s.bookLink}>{data?.book?.title}</a>
          </Link>
          {data?.type !== 'like' && `: <br/> ${data?.text}`}
        </p>
        <p className={s.time}>{moment(data?.created_at).from(moment())}</p>
      </div>
    </div>
  );
};

export default NotificationItem;