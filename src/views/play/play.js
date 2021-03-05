import React, {memo, useState, useRef, useCallback, useEffect} from 'react';
import "./play.scss";
import {useSelector, useDispatch, shallowEqual} from "react-redux";
import PlayProgressBar from "./in-cop/play-progress-bar/play-progress-bar";
import RotateMusicPic from "./in-cop/rotate-music-pic/rotate-music-pic";
import LyricList from "./in-cop/lyric-list/lyric-list";
import PlayMusicList from "./in-cop/play-music-list/play-music-list";
import {changePlayMode} from "../../store/play";
import {nextPlayAction, prevPlayAction, setPlayList} from "../../store/palyList";
import {getLyricData} from "../../server/getServerData";
import {
  playIcon, pauseIcon, prevIcon, nextIcon,
  playForListIcon, playForLoopIcon, playForRandomIcon, playForMore,
  downloadIcon, loveIcon, dislikeIcon, commentIcon, shareIcon, returnIcon,
  moreIcon
} from "../../libs/font-icon";
import {useToast} from "../../utils/useToast";
import {goBack} from "../../utils/goBack";
import {isInWeChat, isIOS} from "../../utils/isEnv";
import {CSSTransition} from 'react-transition-group';

function Play(props) {
  const needAutoPlay = props?.location?.search.includes('auto=false') || true
  const dispatch = useDispatch();
  const {
    playLists,
    playIdx,
    playStatus,
    playMode,
    playTime,
    allTime,
    allTimeStamp,
    progressPercent
  } = useSelector(state => ({
    playLists: state.playList.playLists,
    playIdx: state.playList.playIdx,
    playStatus: state.play.playStatus,
    playMode: state.play.playMode,
    playTime: state.play.playTime,
    allTime: state.play.allTime,
    allTimeStamp: state.play.allTimeStamp,
    progressPercent: state.play.progressPercent
  }), shallowEqual);
  const [lyric, setLyric] = useState([]); // 歌词列表
  const [lyricHeight, setLyricHeight] = useState(0); //  歌词div高度
  const [showLyric, setShowLyric] = useState(false); //  切换歌词列表，默认歌曲图
  const [showAlert, setShowAlert] = useState(false); // 是否展示播放列表
  const {showToast} = useToast()

  const audio = document.getElementById('audio')
  const LyricDom = useRef(null)

  useEffect(() => {
    const outerDom = document.getElementById('playLyricDiv')
    outerDom && setLyricHeight(outerDom.clientHeight)

    function goPlay() {
      if (isIOS() && !isInWeChat()) return
      setTimeout(() => {
        if (audio && audio.paused) { // 判断是否播放，没有的自动开启
          audio.play()
        }
      }, 200)
    }

    !needAutoPlay && goPlay()
  }, [audio, needAutoPlay])

  // 请求歌词用
  useEffect(() => {
    if (playLists.length === 0) {
      goBack()
      return
    }

    async function fetchLyric() {
      if (playLists.length > 0 && playIdx > -1) {
        let item = playLists[playIdx]
        if (item.songLyric) {
          setLyric(item.songLyric)
        } else if (item.id) {
          let lyricStr = await getLyricData(item.id)
          let lyricList = lyricStr.split('\n')
          setLyric(lyricList)
          playLists[playIdx].songLyric = lyricList
          dispatch(setPlayList(playLists))
        }
      }
    }

    fetchLyric()
  }, [dispatch, playLists, playIdx])

  // 滚动歌词用
  useEffect(() => {
    if (audio && !audio.paused && LyricDom.current && lyric.length > 1) { // 同步歌词
      LyricDom.current.scrollToTop('time-' + playTime)
    }
  }, [playTime, lyric, audio])

  // 切换播放状态
  const togglePlayStatus = () => {
    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
    }
  }

  // 切换歌曲图/歌词展示
  const toggleLyricDisplay = useCallback(() => {
    setShowLyric(!showLyric)
  }, [showLyric])

  // 切换播放模式
  const changeMode = () => {
    let changeMode = playMode === 3 ? 1 : playMode + 1
    // 【1:列表】【2:随机】【3:单曲】
    showToast(changeMode === 1 ? '列表循环' : (
      changeMode === 2 ? '随机播放' : '单曲循环'
    ), 1000)
    dispatch(changePlayMode(changeMode))
  }

  // 点击上一首歌
  const prev = useCallback(() => {
    dispatch(prevPlayAction())
  }, [dispatch])

  // 点击下一首歌
  const next = useCallback(() => {
    dispatch(nextPlayAction())
  }, [dispatch])

  // 手动修改audio播放进度
  const changeCurrent = (val) => {
    audio.currentTime = allTimeStamp * val * 0.01
  }

  const toggleShowAlert = useCallback(() => {
    setShowAlert(!showAlert)
  }, [showAlert])

  function noSupport() {
    showToast('暂无此功能')
  }

  const nowPlayInfo = playLists.length > 0 ? playLists[playIdx] : null

  const topBg = {
    backgroundImage: nowPlayInfo ? `url(${nowPlayInfo?.al?.picUrl}?imageView&thumbnail=50y50&quality=15&tostatic=0)` : '',
  }

  return (
    <div className="play-container">
      <div className="play-bg-blur" style={topBg}></div>
      {/* header */}
      <div className="play-ctx-header">
        <p className="play-header-l flex-center-center" onClick={goBack}>{returnIcon}</p>
        <div className="play-header-t">
          <p className="play-header-title one-line-overflow-ellipsis">
            {nowPlayInfo?.name}
          </p>
          <p className="one-line-overflow-ellipsis">
            {nowPlayInfo?.ar[0]?.name}
          </p>
        </div>
        <p className="play-header-r" onClick={noSupport}>{shareIcon}</p>
      </div>
      <p className="play-ctx-header-block" data-message={'顶部占位'}>&nbsp;</p>

      {/* 歌曲旋转中心/歌词 */}
      <div id="playLyricDiv"
           className="play-ctx-content flex-center-center"
           onClick={toggleLyricDisplay}>
        <div className="absolute-ctx flex-center-center"
             style={{zIndex: !showLyric ? 0 : -1, opacity: !showLyric ? 1 : 0}} data-message={'歌曲图'}>
          <RotateMusicPic nowPlayInfo={nowPlayInfo}
                          lyricHeight={lyricHeight}
                          playStatus={playStatus}/>
        </div>
        <div className="absolute-ctx flex-center-center"
             style={{zIndex: showLyric ? 0 : -1, opacity: showLyric ? 1 : 0}} data-message={'歌词列表'}>
          {
            lyric.length > 0 ?
              <LyricList ref={LyricDom} lyricHeight={lyricHeight} lyric={lyric}/> :
              <p className="lyric-list-ctx">暂无歌词</p>
          }
        </div>
      </div>

      <p className="play-ctx-footer-block" data-message={'底部占位'}>&nbsp;</p>
      {/* 底部 */}
      <div className="play-ctx-footer">
        <p className="play-music-info-btn flex-between-center">
          <span>{false ? loveIcon : dislikeIcon}</span>
          <span onClick={noSupport}>{downloadIcon}</span>
          <span onClick={noSupport}>{commentIcon}</span>
          <span onClick={noSupport}>{moreIcon}</span>
        </p>
        <PlayProgressBar progressPercent={progressPercent}
                         playTime={playTime}
                         allTime={allTime}
                         allTimeStamp={allTimeStamp}
                         changeCurrent={changeCurrent}/>
        <div className="play-music-control flex-between-center">
          <span onClick={changeMode}>
            {playMode === 1 ? playForListIcon : (
              playMode === 2 ? playForRandomIcon : playForLoopIcon
            )}
          </span>
          <span onClick={prev}>{prevIcon}</span>
          <span className="play-pause-btn" onClick={togglePlayStatus}>
            {!playStatus ? playIcon : pauseIcon}
          </span>
          <span onClick={next}>{nextIcon}</span>
          <span onClick={toggleShowAlert}>{playForMore}</span>
        </div>
      </div>

      {/* 播放列表 */}
      <>
        {
          showAlert &&
          <div className="play-music-list-bg" onClick={toggleShowAlert}></div>
        }
        {
          <CSSTransition
            in={showAlert}
            timeout={300}
            classNames="alert"
            // onEnter={() => setShowButton(false)}
            // onExited={() => setShowButton(true)}
            unmountOnExit>
            <PlayMusicList playLists={playLists}
                           playIdx={playIdx}
                           playMode={playMode}
                           toggleShowAlert={toggleShowAlert}/>
          </CSSTransition>
        }
      </>
    </div>
  )
}

export default memo(Play);
