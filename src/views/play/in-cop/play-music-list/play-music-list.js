import React, {memo, useEffect} from 'react';
import "./play-music-list.scss";
import {useDispatch} from "react-redux";
import {lock, clearBodyLocks} from "tua-body-scroll-lock";
import {prevPlayAction} from "../../../../store/palyList";
import {removePlayList, setPlayIdx} from "../../../../store/palyList/playListActionCreator";
import {closeIcon} from "../../../../libs/font-icon";

const PlayMusicList = (props) => {
  const dispatch = useDispatch()
  const arr = props.playLists
  const playIdx = props.playIdx
  const playMode = props.playMode

  useEffect(() => {
    const elementOne = document.querySelector('.play-music-list-scroll')
    lock(elementOne)
    return () => {
      clearBodyLocks()
    }
  }, [])

  /* 选中当前歌曲 */
  function selectItem(idx) {
    dispatch(setPlayIdx(idx))
  }

  /* 移除当前歌曲 */
  function removeItem(idx) {
    dispatch(removePlayList(idx))
    if (idx < playIdx) {
      dispatch(prevPlayAction())
    }
  }

  function showMode() {
    switch (playMode) {
      case 1:
        return '列表播放'
      case 2:
        return '随机播放'
      case 3:
        return '单曲播放'
      default:
        return '列表播放'
    }
  }

  const nowItem = arr[playIdx] || null

  return (
    <div className="play-music-list-ctx" onClick={e => e.stopPropagation()}>
    {/* header */}
    <div className="play-music-list-header">
      <p>
        <span>当前播放</span>
        <span className="play-list-num">({arr.length})</span>
      </p>
      <p className="play-mode-text flex-between-center">
        <span>{showMode()}</span>
      </p>
    </div>
    {/* content */}
    <div className="play-music-list-scroll">
      {
        arr.map((item, idx) => {
          return <div className="play-music-list-item flex-between-center" key={item.id}>
            <p className={`flex-center-left ${item.id === nowItem?.id ? 'play-now-color' : ''}`}
               style={{width: '78%'}}
               onClick={() => selectItem(idx)}>
                <span className="play-music-list-item-title one-line-overflow-ellipsis">
                  {item.name}
                </span>
              <span className="play-music-list-item-author one-line-overflow-ellipsis">
                  － {item.ar[0].name}
                </span>
            </p>
            <span className="play-music-close-icon flex-center-center"
                  onClick={() => removeItem(idx)}>{closeIcon}</span>
          </div>
        })
      }
    </div>
    {/* footer */}
    <p className="play-music-list-footer flex-center-center"
       onClick={props.toggleShowAlert}>关闭</p>
  </div>
  );
};

export default memo(PlayMusicList);
