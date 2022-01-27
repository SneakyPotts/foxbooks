import React, {useState} from 'react';
import Image from 'next/image';
import ReactPlayer from 'react-player'

import styles from './styles.module.scss'
import PlayerBack from "../shared/icons/playerBack";
import PlayerNext from "../shared/icons/playerNext";

const AudioPlayer = () => {
  const [settings, setSettings] = useState({
    playing: false,
    volume: 0.2,
    muted: false,
    playbackRate: 1,

  });
  return (
      <div className={styles.wrapper}>
        <div className={styles.wrapperColumn}>
          <div className={styles.preview}>
            <Image
              src={'/mountains.png'}
              width={56}
              height={56}
              alt="Preview"
              className={styles.previewImg}
            />
            <div className={styles.previewWrapper}>
              <h4 className={styles.previewTitle}>Лекция “Про Гарри Поттера”</h4>
              <span className={styles.previewText}>Глава 1</span>
            </div>
          </div>
        </div>
        <div className={styles.wrapperColumn}>
          <div className={styles.player}>
            <div className={styles.playerControls}>
              <button className={styles.playerBack}>
                <PlayerBack />
              </button>
              <button className={styles.playerPlay}></button>
              <button className={styles.playerNext}>
                <PlayerNext />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.wrapperColumn}>
          controls
        </div>

        <ReactPlayer
          url='https://www.youtube.com/watch?v=70Pfl-466gU'
          width="0"
          height="0"
          {...settings}
        />
      </div>
  );
};

export default AudioPlayer;
