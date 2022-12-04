import React, {useEffect, useRef, useState} from 'react';
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
import {setPlayerVisibility} from "../../store/commonSlice";
import DrawerPopup from '../shared/common/DrawerPopup';
import BackBtn from '../shared/common/BackBtn';
import {resetPlayerData, setAudioProgress} from "../../store/playerSlice";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import debounce from "lodash.debounce";

const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

const AudioPlayer = () => {
  const dispatch = useDispatch()
  const player = useRef()

  const [settings, setSettings] = useState({
    playing: true,
    volume: 0.5,
    playbackRate: 1,
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
  const [mute, setMute] = useState(0);

  const duration = +player.current?.getDuration() || 0

  const playerBody = useRef(null);

  const saveProgressHandler = debounce(setSaveProgress, 100)

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
    setIsClosed(true)
    setTimeout(() => {
      dispatch(setPlayerVisibility(false))
      dispatch(resetPlayerData())
    }, 300)
  }

  const handleEnd = () => {
    const currentChapterIndex = playerData?.chapters?.findIndex(i => i?.id === currentChapter)
    const nextChapterIndex = currentChapterIndex === -1 ? 1 : currentChapterIndex + 1

    if(nextChapterIndex !== playerData?.chapters?.length) {
      if (isAuth) {
        dispatch(setAudioProgress({
          audio_book_id: userProgress?.audio_book_id || playerData?.chapters?.[0]?.book_id,
          audio_audiobook_id: playerData?.chapters?.[nextChapterIndex]?.id,
          current_audio_time: 0
        })).then(() => setCurrentChapter(playerData?.chapters?.[nextChapterIndex]?.id))
      } else {
        setCurrentChapter(playerData?.chapters?.[nextChapterIndex]?.id)
      }
    }
  }

  const handleMute = () => {
    if (!mute) {
      setMute(settings?.volume)
      setSettings({...settings, volume: 0})
    } else {
      setMute(0)
      setSettings({...settings, volume: mute})
    }
  }

  const handleSetValue = value => {
    setSettings({...settings, volume: value})
    setMute(0)
  }

  const resumeListening = () => {
    if (isAuth) {
      if (!!userProgress) {
        setCurrentChapter(userProgress?.audio_audiobook_id)
        player.current.seekTo(userProgress?.current_audio_time)
      } else {
        setCurrentChapter(playerData?.chapters?.[0].id)
      }
    }
  }

  const changeChapter = (chapterId) => {
		if (isAuth) {
			dispatch(setAudioProgress({
				audio_book_id: userProgress?.audio_book_id || playerData?.chapters?.[0]?.book_id,
				audio_audiobook_id: chapterId,
				current_audio_time: 0
			})).then(() => setCurrentChapter(chapterId))
		} else {
			setCurrentChapter(chapterId)
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
          <Image
            src={playerData?.image}
            width={innerWidthWindow < 1024 ? 280 : 56}
            height={innerWidthWindow < 1024 ? 280 : 56}
            alt="Preview"
            className={styles.previewImg}
          />
          <div className={styles.previewWrapper}>
            <h4 className={styles.previewTitle}>{playerData?.title}</h4>
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
            <PlayerVolume mute={mute}/>
          </div>
          <InputRange
            value={settings?.volume}
            setValue={handleSetValue}
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
        onProgress={e => {
          saveProgressHandler(e.playedSeconds)
          setProgress(parseInt(e.playedSeconds))
        }}
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
