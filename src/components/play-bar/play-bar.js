import React, {memo, useState, useCallback} from "react";
import "./play-bar.scss";
import {useSelector, shallowEqual} from "react-redux";
import CircleProgress from "./in-cop/circle-progress/circle-progress";
import PlayMusicList from "../../views/play/in-cop/play-music-list/play-music-list";
import history from "../../router/history";
import {miniPauseIcon, miniPlayIcon, menuIcon} from "../../libs/font-icon";
import {CSSTransition} from 'react-transition-group';

function PlayBar(props) {
  const [showAlert, setShowAlert] = useState(false)
  const {playLists, playIdx, playStatus, playMode, progressPercent, showSearch} = useSelector(state => ({
    playLists: state.playList.playLists,
    playIdx: state.playList.playIdx,
    playStatus: state.play.playStatus,
    playMode: state.play.playMode,
    progressPercent: state.play.progressPercent,
    showSearch: state.search.showSearch,
  }), shallowEqual)
  let audio = document.getElementById('audio')

  // 切换播放状态
  const togglePlayStatus = (e) => {
    e.stopPropagation();
    if (!audio) {
      audio = document.getElementById('audio')
    }
    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
    }
  }

  const toggleShowAlert = useCallback((e) => {
    e.stopPropagation();
    setShowAlert(!showAlert)
  }, [showAlert])

  const linkPlayList = () => {
    history.push('/playlist?auto=false')
  }

  const nowPlayInfo = playLists.length > 0 ? playLists[playIdx] : null
  const playContainerClass = `play-fixed-bar-ctx flex-between-center 
  ${(props.nowRouteName !== '/' || showSearch) ? 'fix-bottom-0' : ''}`

  return (
    <div className={playContainerClass} onClick={linkPlayList}>
      <img className="play-bar-round play-min-run"
           style={{
             'animationPlayState': playStatus ? 'running' : 'paused',
           }}
           src={nowPlayInfo?.al?.picUrl} alt=""/>
      <div className="play-bar-content one-line-overflow-ellipsis">
        <span className="play-bar-content-title one-line-overflow-ellipsis">
          {nowPlayInfo?.name}
        </span>
        <span className="play-bar-min-font one-line-overflow-ellipsis"> - {nowPlayInfo?.ar[0]?.name}</span>
      </div>
      <div className="play-control-bar flex-center-left">
        <div className="play-control-play-icon" onClick={e => togglePlayStatus(e)}>
          <CircleProgress progress={progressPercent}>
            <p>
              {playStatus ? miniPauseIcon : miniPlayIcon}
            </p>
          </CircleProgress>
        </div>
        <p className="play-control-more-icon" onClick={toggleShowAlert}>
          {menuIcon}
        </p>
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
            unmountOnExit>
            <PlayMusicList playLists={playLists}
                           playIdx={playIdx}
                           playMode={playMode}
                           toggleShowAlert={toggleShowAlert}/>
          </CSSTransition>
        }
      </>
    </div>
  );
}

export default memo(PlayBar);
