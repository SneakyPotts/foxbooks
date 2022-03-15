import React, {useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import Stars from "../shared/common/stars/Stars";
import Like from "../shared/icons/heart";
import classNames from "classnames";
import HorizontalDots from "../shared/icons/horizontalDots";
import All from "../shared/icons/all";
import Bin from "../shared/icons/trash";
import DrawerPopup from "../shared/common/DrawerPopup";
import styles from './styles.module.scss'
import DotsDropdown from "../DotsDropdown";

const QuoteItem = ({
  onDelete
}) => {
  const [controlsIsVisible, setControlsIsVisible] = useState(false);

  return (
    <div className={styles.quoteBlock}>
      <div className={styles.quoteBlockHeader}>
        <Link href="/">
          <a>
            <Image
              src="/horizontalBookCovers/book.png"
              alt=""
              width={41}
              height={64}
              className={styles.quoteBlockImg}
            />
          </a>
        </Link>

        <div className={styles.quoteBlockHeaderInfo}>
          <Link  href="/">
            <a className={styles.quoteBlockTitle}>Гарри Поттер и философский камень</a>
          </Link>
          <Link  href="/">
            <a className={styles.quoteBlockAuthor}>Джоан Роулинг</a>
          </Link>
          <div className={styles.quoteBlockStars}>
            <Stars/>
            <div className={styles.quoteBlockStarsRaiting}>5,3 (450)</div>
          </div>
        </div>
      </div>

      <p className={styles.quoteBlockText}>
        Семья Дурсль ей имела все, чего только можно пожелать. Но был у них
        и один секрет. Причем больше всего на свете они боялись, что
        кто-нибудь о нем узнает. Дурсли даже представить себе не могли, что
        с ними будет, если выплывет правда о Поттерах. Миссис Поттер
        приходилась миссис Дурсль
      </p>

      <div className={styles.reviewBottom}>
        <div className={styles.reviewBottomStatistic}>
          <span className={styles.reviewIcon}>
            <Like/>
          </span>
          <span className={styles.reviewLike}>3115</span>
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