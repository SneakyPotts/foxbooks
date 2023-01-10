import React, {useEffect, useRef, useState} from 'react';
import ReactPlayer from 'react-player'
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import Link from "next/link";
import Image from 'next/image';
import PlayerBack from "../shared/icons/playerBack";
import PlayerNext from "../shared/icons/playerNext";
import PlayerPause from "../shared/icons/playerPause";
import PlayerPlay from "../shared/icons/playerPlay";
import InputRange from "../shared/common/InputRange/InputRange";
import PlayerSpeed from "../shared/icons/playerSpeed";
import PlayerPage from "../shared/icons/playerPage";
import PlayerVolume from "../shared/icons/playerVolume";
import Close from "../shared/icons/close";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import DrawerPopup from '../shared/common/DrawerPopup';
import BackBtn from '../shared/common/BackBtn';
import debounce from "lodash.debounce";
import {resetPlayerData, setAudioProgress} from "../../store/playerSlice";
import {setPlayerVisibility} from "../../store/commonSlice";
import styles from './styles.module.scss'

const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

const AudioPlayer = () => {
  const dispatch = useDispatch()
  const player = useRef()

  const [settings, setSettings] = useState({
    playing: true,
    volume: 0.5,
    playbackRate: 1,
    muted: false,
  });

  const { innerWidthWindow } = useSelector(state => state.common)
  const { isAuth } = useSelector(state => state.auth)
  const playerData = useSelector(state => state.player)
  const userProgress = playerData.user_progress

  const [progress, setProgress] = useState(0)
  const [speedDropIsVisible, setSpeedDropIsVisible] = useState(false)
  const [pageDropIsVisible, setPageDropIsVisible] = useState(false)
  const [currentChapter, setCurrentChapter] = useState(null)
  const [saveProgress, setSaveProgress] = useState(0)
  const [isClosed, setIsClosed] = useState(false)
  const [lockControls, setLockControls] = useState(false);

  const duration = +player.current?.getDuration() || 0

  const playerBody = useRef(null);

  const saveProgressHandler = debounce(setSaveProgress, 100)

  const changeSeek = (value) => {
    if (lockControls) return

    if (parseInt(value) === Math.floor(duration)) {
      setLockControls(true)
      handleEnd()
    }

    if (parseInt(value) === 0) {
      setLockControls(true)
      handlePrev()
    }

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
    setIsClosed(true)
    setTimeout(() => {
      dispatch(setPlayerVisibility(false))
      document.body.removeAttribute('style')
      dispatch(resetPlayerData())
    }, 300)
  }

  const changeChapter = (chapterId) => {
    if (isAuth) {
      dispatch(setAudioProgress({
        audio_book_id: userProgress?.audio_book_id || playerData?.chapters?.[0]?.book_id,
        audio_audiobook_id: chapterId,
        current_audio_time: 0
      })).then(() => {
        setCurrentChapter(chapterId)
      })
    } else {
      setCurrentChapter(chapterId)
    }
  }

  const handleEnd = () => {
    const currentChapterIndex = playerData?.chapters?.findIndex(i => i?.id === currentChapter)
    const nextChapterIndex = currentChapterIndex === -1 ? 1 : currentChapterIndex + 1

    if(nextChapterIndex !== playerData?.chapters?.length) {
      changeChapter(playerData?.chapters?.[nextChapterIndex]?.id)
    }
  }

  const handlePrev = () => {
    const currentChapterIndex = playerData?.chapters?.findIndex(i => i?.id === currentChapter)
    const prevChapterIndex = currentChapterIndex === -1 || currentChapterIndex === 0
      ? 0
      : currentChapterIndex - 1

    changeChapter(playerData?.chapters?.[prevChapterIndex]?.id)
  }

  const handleOnProgress = (ev) => {
    saveProgressHandler(ev.playedSeconds)
    setProgress(parseInt(ev.playedSeconds))
    lockControls && parseInt(ev.playedSeconds) > 1 && setLockControls(false)
  }

  const handleMute = () => {
    if (+settings.volume === 0) return

    setSettings({...settings, muted: !settings.muted})
  }

  const handleSetVolume = (value) => {
    setSettings({...settings, volume: value, muted: +value === 0 })
  }

  const resumeListening = () => {
    if (isAuth) {
      if (!!userProgress) {
        setCurrentChapter(userProgress?.audio_audiobook_id)
        player.current?.seekTo(userProgress?.current_audio_time)
      } else {
        setCurrentChapter(playerData?.chapters?.[0].id)
      }
    }
  }

  useEffect(() => {
    if (isAuth) {
    	let delta = Math.abs(progress - (userProgress?.current_audio_time || 0))

			if (delta >= 10 && currentChapter) {
				dispatch(setAudioProgress({
					audio_book_id: userProgress?.audio_book_id || playerData?.chapters?.[0]?.book_id,
					audio_audiobook_id: currentChapter,
					current_audio_time: progress
				}))
			}
    }
  }, [saveProgress])

  useOnClickOutside(playerBody, hideDrops);

  return (
    <div
      className={classNames(styles.wrapper, {[styles.hide] : isClosed})}
      onClick={hideDrops}
      ref={playerBody}
    >
      <BackBtn
        onClick={closePlayer}
        externalClass={styles.closeArrow}
      />
      <div className={styles.wrapperColumn}>
        <div className={styles.preview}>
          <Link href={playerData?.link}>
            <a>
              <Image
                src={playerData?.image}
                width={innerWidthWindow < 1024 ? 280 : 56}
                height={innerWidthWindow < 1024 ? 280 : 56}
                alt="Preview"
                className={styles.previewImg}
              />
            </a>
          </Link>
          <div className={styles.previewWrapper}>
            <Link href={playerData?.link}>
              <a>
                <h4 className={styles.previewTitle}>{playerData?.title}</h4>
              </a>
            </Link>
            <span className={styles.previewText}>
              {playerData?.chapters?.find(i => i?.id === currentChapter)?.title || playerData?.chapters?.[0]?.title}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.wrapperColumn}>
        <div className={styles.player}>
          <div className={styles.playerControls}>
            <button
              className={styles.playerBack}
              onClick={() => changeSeek(progress - 10 > 0 ? progress - 10 : 0)}
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
              onClick={() => changeSeek(progress + 10 <= duration ? progress + 10 : duration)}
            >
              <PlayerNext />
            </button>
          </div>

          <div className={styles.playerRange}>
            {new Date(progress * 1000).toISOString().substr(11, 8)}
            <InputRange
              value={progress}
              setValue={changeSeek}
              max={`${duration}`}
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
            <DrawerPopup
              direction='up'
              onClose={() => setSpeedDropIsVisible(false)}
            >
              {speeds?.map(i =>
                <span
                  key={i}
                  onClick={() => setSettings({...settings, playbackRate: i})}
                  className={classNames(styles.dropItem, {[styles.active]: i === settings?.playbackRate})}
                >
                  {i === 1 ? 'Обычная' : i}
                </span>
              )}
            </DrawerPopup>
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
            <DrawerPopup
              direction='up'
              onClose={() => setPageDropIsVisible(false)}
            >
              <div className={styles.playerPageDropdown}>
                {playerData?.chapters?.map((i, index) =>
                  <span
                    key={i?.id}
                    onClick={() => changeChapter(i?.id)}
                    className={classNames(styles.dropItem, {[styles.active]: currentChapter ? i?.id === currentChapter : index === 0})}
                  >
                    {i?.title}
                  </span>
                )}
              </div>
            </DrawerPopup>
          }
        </div>
        <div className={classNames(styles.playerVolume, styles.playerControlItem)}>
          <div onClick={handleMute}>
            <PlayerVolume mute={settings.muted}/>
          </div>
          <InputRange
            value={settings?.volume}
            setValue={handleSetVolume}
            max={'1'}
            step={'0.1'}
            barColor={'rgba(255, 255, 255, 0.5)'}
            externalClass={styles.playerVolumeInput}
          />
        </div>
      </div>

      <ReactPlayer
        ref={player}
        url={playerData?.chapters?.find(i => i?.id === currentChapter)?.public_path || playerData?.chapters?.[0]?.public_path}
        width="0"
        height="0"
        onStart={resumeListening}
        onProgress={handleOnProgress}
        onEnded={handleEnd}
        {...settings}
      />

      <button
        className={styles.close}
        onClick={closePlayer}
      >
        <Close/>
      </button>
    </div>
  );
};

export default AudioPlayer;
