import Image from "next/image";
import Link from "next/link";
import Stars from "../shared/common/stars/Stars";
import Like from "../shared/icons/heart";
import All from "../shared/icons/all";
import Bin from "../shared/icons/trash";
import styles from './styles.module.scss'
import DotsDropdown from "../DotsDropdown";

const QuoteItem = ({
  data,
  onDelete
}) => {
  return (
    <div className={styles.quoteBlock}>
      <div className={styles.quoteBlockHeader}>
        <Link href={`/book/${data?.book?.id}?type=books`}>
          <a>
            <Image
              src={data?.book?.image?.link}
              alt="Picture"
              width={41}
              height={64}
              className={styles.quoteBlockImg}
              placeholder="blur"
              blurDataURL="/blur.webp"
            />
          </a>
        </Link>

        <div className={styles.quoteBlockHeaderInfo}>
          <Link href={`/book/${data?.book?.id}?type=books`}>
            <a className={styles.quoteBlockTitle}>{data?.book?.title}</a>
          </Link>
          <Link href={`/author?id=${data?.book?.authors[0]?.id}`}>
            <a className={styles.quoteBlockAuthor}>{data?.book?.authors[0]?.author}</a>
          </Link>
          <div className={styles.quoteBlockStars}>
            <Stars value={data?.book?.rates_avg}/>
            <div className={styles.quoteBlockStarsRaiting}>{data?.book?.rates_avg} ({data?.book?.rates_count})</div>
          </div>
        </div>
      </div>

      <p className={styles.quoteBlockText}>{data?.text}</p>

      <div className={styles.reviewBottom}>
        <div className={styles.reviewBottomStatistic}>
          <span className={styles.reviewIcon}>
            <Like/>
          </span>
          <span className={styles.reviewLike}>{data?.likes_count}</span>
        </div>

        <div>
          <DotsDropdown isSmall>
            <div
              className={styles.controlsItem}
              // onClick={() => setEditFormIsVisible(true)}
            >
              <All />
              Показать в книге
            </div>

            <div
              className={styles.controlsItem}
              onClick={onDelete}
            >
              <Bin />
              Удалить
            </div>
          </DotsDropdown>
        </div>
      </div>
    </div>
  );
};

export default QuoteItem;