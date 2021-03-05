import React, {memo, useRef, useCallback} from 'react';
import {useSelector, useDispatch, shallowEqual} from "react-redux";
import {changePlayStatus, setPlayTime, setAllTime, setAllTimeStamp, setProgressPercent} from "../../store/play";
import {formatTimeSecond} from "../../utils/formatTime";
import {nextPlayAction} from "../../store/palyList";

function Audio() {
  const dispatch = useDispatch();
  const {playLists, playIdx, playMode} = useSelector(state => ({
    playLists: state.playList.playLists,
    playIdx: state.playList.playIdx,
    playMode: state.play.playMode,
    playTime: state.play.playTime,
    allTime: state.play.allTime,
    allTimeStamp: state.play.allTimeStamp,
    progressPercent: state.play.progressPercent
  }), shallowEqual);
  const musicRef = useRef(null)

  // 存歌曲播放/暂停
  const runOrStopForStatus = useCallback((status) => {
    dispatch(changePlayStatus(status))
  }, [dispatch])

  // 当currentTime更新时会触发timeupdate事件。
  // 同步歌词、播放进度
  const musicTimeUpdate = useCallback((e, modifyCurrentTime = 0) => {
    const duration = e.target.duration
    const currentTime = modifyCurrentTime || e.target.currentTime // 单位是秒
    const playTime = formatTimeSecond(currentTime, 'mm:ss')
    dispatch(setPlayTime(playTime)) // 当前播放时间
    dispatch(setAllTime(formatTimeSecond(duration, 'mm:ss'))) // 总播放时间
    dispatch(setAllTimeStamp(duration))
    dispatch(setProgressPercent(((currentTime / duration) * 100) || 0)) // 播放进度
    if (currentTime === duration && duration !== 0) { // 播放结束
      dispatch(nextPlayAction())
    }
  }, [dispatch])

  const nowPlayInfo = playLists.length > 0 ? playLists[playIdx] : null

  return (
    <>
      {
        playLists.length > 0 ?
        <audio id="audio" ref={musicRef}
               src={nowPlayInfo?.playUrl} controls={false} autoPlay={true}
               loop={playMode === 3 || (playMode === 1 && playLists.length === 1)}
               onPlay={() => runOrStopForStatus(true)}
               onPause={() => runOrStopForStatus(false)}
               onCanPlay={e => musicTimeUpdate(e)}
               onTimeUpdate={(e) => musicTimeUpdate(e)}/>
               : <audio id="audio" src=""></audio>
      }
    </>
  );
}

export default memo(Audio);
