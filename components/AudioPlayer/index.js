import React, {useMemo, useRef, useState} from 'react';
import Image from 'next/image';
import ReactPlayer from 'react-player'
import PlayerBack from "../shared/icons/playerBack";
import PlayerNext from "../shared/icons/playerNext";
import PlayerPause from "../shared/icons/playerPause";
import PlayerPlay from "../shared/icons/playerPlay";

import styles from './styles.module.scss'
import InputRange from "../shared/common/InputRange/InputRange";
import PlayerSpeed from "../shared/icons/playerSpeed";
import PlayerPage from "../shared/icons/playerPage";
import PlayerVolume from "../shared/icons/playerVolume";
import classNames from "classnames";
import Close from "../shared/icons/close";
import {useDispatch, useSelector} from "react-redux";
import {togglePlayer} from "../../store/commonSlice";
import ArrowBack from "../shared/icons/arrowBack";

const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

const AudioPlayer = () => {
  const dispatch = useDispatch()
  const player = useRef()

  const [settings, setSettings] = useState({
    playing: false,
    volume: 0.5,
    playbackRate: 1,
  });

  const { innerWidthWindow } = useSelector(state => state.common)

  const [progress, setProgress] = useState(0)
  const [speedDropIsVisible, setSpeedDropIsVisible] = useState(false)
  const [pageDropIsVisible, setPageDropIsVisible] = useState(false)

  const duration = +player.current?.getDuration() || 0

  const changeSeek = value => {
    player.current?.seekTo(parseInt(value))
    setProgress(parseInt(value))
  }

  const toggleSpeedDrop = ev => {
    ev.stopPropagation()
    setPageDropIsVisible(false)
    setSpeedDropIsVisible(!speedDropIsVisible)
  }

  const togglePageDrop = ev => {
    ev.stopPropagation()
    setSpeedDropIsVisible(false)
    setPageDropIsVisible(!pageDropIsVisible)
  }

  const hideDrops = () => {
    setSpeedDropIsVisible(false)
    setPageDropIsVisible(false)
  }

  const closePlayer = () => {
    setSettings({...settings, playing: false})
    dispatch(togglePlayer(false))
  }

  return (
    <div
      className={styles.wrapper}
      onClick={hideDrops}
    >
      {innerWidthWindow < 1024 &&
        <button
          className={styles.closeArrow}
          onClick={closePlayer}
        >
          <ArrowBack />
        </button>
      }
      <div className={styles.wrapperColumn}>
        <div className={styles.preview}>
          <Image
            src={'/mountains.png'}
            width={innerWidthWindow < 1024 ? 280 : 56}
            height={innerWidthWindow < 1024 ? 280 : 56}
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
            <button
              className={styles.playerBack}
              onClick={() => changeSeek(progress - 10)}
            >
              <PlayerBack />
            </button>
            <button
              className={styles.playerPlay}
              onClick={() => setSettings({...settings, playing: !settings?.playing})}
            >
              {settings?.playing ?
                <PlayerPause /> :
                <PlayerPlay />
              }
            </button>
            <button
              className={styles.playerNext}
              onClick={() => changeSeek(progress + 10)}
            >
              <PlayerNext />
            </button>
          </div>

          <div className={styles.playerRange}>
            {new Date(progress * 1000).toISOString().substr(11, 8)}
            <InputRange
              value={progress}
              setValue={changeSeek}
              max={duration}
              barColor={'rgba(255, 255, 255, 0.5)'}
              externalClass={styles.playerRangeInput}
            />
            {new Date(duration * 1000).toISOString().substr(11, 8)}
          </div>
        </div>
      </div>
      <div className={styles.wrapperColumn}>
        <div
          className={classNames(
            styles.playerSpeed,
            styles.playerControlItem,
            {[styles.active]: speedDropIsVisible}
          )}
          onClick={ev => toggleSpeedDrop(ev)}
        >
          <PlayerSpeed />
          {speedDropIsVisible &&
            <div
              className={styles.playerDrop}
              onClick={ev => ev.stopPropagation()}
            >
              {speeds?.map(i =>
                <span
                  key={i}
                  onClick={() => setSettings({...settings, playbackRate: i})}
                  className={classNames({[styles.active]: i === settings?.playbackRate})}
                >
                  {i === 1 ? 'Обычная' : i}
                </span>
              )}
            </div>
          }
        </div>
        <div
          className={classNames(
            styles.playerPage,
            styles.playerControlItem,
            {[styles.active]: pageDropIsVisible}
          )}
          onClick={ev => togglePageDrop(ev)}
        >
          <PlayerPage />
          {pageDropIsVisible &&
            <div
              className={styles.playerDrop}
              onClick={ev => ev.stopPropagation()}
            >
            {speeds?.map(i =>
              <span
                key={i}
                onClick={() => setSettings({...settings, playbackRate: i})}
                className={classNames({[styles.active]: i === settings?.playbackRate})}
              >
                {i === 1 ? 'Обычная' : i}
              </span>
            )}
          </div>
          }
        </div>
        {innerWidthWindow >= 1024 &&
          <div className={classNames(styles.playerVolume, styles.playerControlItem)}>
            <div onClick={() => setSettings({...settings, volume: 0})}>
              <PlayerVolume/>
            </div>
            <InputRange
              value={settings?.volume}
              setValue={value => setSettings({...settings, volume: value})}
              max={'1'}
              step={'0.1'}
              barColor={'rgba(255, 255, 255, 0.5)'}
              externalClass={styles.playerVolumeInput}
            />
          </div>
        }
      </div>

      <ReactPlayer
        ref={player}
        url='https://www.youtube.com/watch?v=70Pfl-466gU'
        width="0"
        height="0"
        onProgress={e => setProgress(parseInt(e.playedSeconds))}
        {...settings}
      />

      {innerWidthWindow >= 1024 &&
        <button
          className={styles.close}
          onClick={closePlayer}
        >
          <Close/>
        </button>
      }
    </div>
  );
};

export default AudioPlayer;
