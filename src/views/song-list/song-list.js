import React, {memo, useEffect, useState} from 'react';
import "./song-list.scss";
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {getPlayListData} from "../../server/getServerData";
import history from "../../router/history";
import {addPlayListAction, setPlayList} from "../../store/palyList";
import {usePlayData} from "../../utils/usePlayData";
import {setPlayIdx} from "../../store/palyList/playListActionCreator";
import {useToast} from "../../utils/useToast";
import {goBack} from "../../utils/goBack";
import {otherPlayIcon, otherPauseIcon, returnIcon} from "../../libs/font-icon";

function SongList() {
  const dispatch = useDispatch();
  const {playLists, playIdx, playStatus} = useSelector(state => ({
    playLists: state.playList.playLists,
    playIdx: state.playList.playIdx,
    playStatus: state.play.playStatus
  }), shallowEqual)
  let {id} = useParams();
  let [info, setInfo] = useState(null)
  let [ids, setIds] = useState('')
  const {showToast} = useToast()
  let {list} = usePlayData(ids)

  useEffect(() => {
    async function fetchData() {
      const data = await getPlayListData(id)
      let ids = data.trackIds.reduce((prev, val) => {
        return prev += (prev ? ',' : '') + val.id
      }, '')
      setInfo(data)
      setIds(ids)
    }

    fetchData();
  }, [id])

  const play = (item) => {
    if (!item.canPlay) {
      showToast('暂无版权')
      return
    }
    dispatch(addPlayListAction(item, 'play'))
    history.push('/playlist')
  }

  const playAll = () => {
    let newList = list.filter(item => item.canPlay)
    if (newList.length === 0) {
      showToast('当前专辑无版权')
      return;
    }
    dispatch(setPlayList(newList))
    dispatch(setPlayIdx(0))
    history.push('/playlist')
  }

  const topBg = {
    backgroundSize: '1000%',
    backgroundPosition: 'center center',
    backgroundImage: info ? `url(${info.coverImgUrl}?imageView&thumbnail=50y50&quality=15&tostatic=0&blur=40x20)` : ''
  }

  const nowItem = playLists[playIdx] || null

  return (
    <div className="song-list-ctx">
      <div className="song-list-nav flex-between-center">
        <span className="list-nav-left-icon" onClick={goBack}>{returnIcon}</span>
        <span>歌单</span>
        <span></span>
        <div className="abs-song-nav-bg" style={topBg}>&nbsp;</div>
      </div>
      <div className="song-list-info" style={topBg}>
        <img className="song-list-info-logo" src={info?.coverImgUrl} alt=""/>
        <div>
          <p className="song-list-title more-line-overflow-ellipsis">{info?.name}</p>
          <p className="song-list-desc more-line-overflow-ellipsis">{info?.description}</p>
        </div>
      </div>
      <p className="need-fixed-play-bar flex-between-center" onClick={playAll}>
        <span className="flex-center-center">
          <span className="play-bar-icon">{otherPlayIcon}</span>
          <span>播放全部<span className="play-bar-min-font">({list.length})</span></span>
        </span>
      </p>
      <div className="background-content-fill">
        {
          list.length > 0 && list.map((item, idx) => {
            const disableItem = !item.canPlay ? 'disabled-list-item' : ''
            return <div className={`song-list-item ${disableItem}`}
                        key={item.id} onClick={() => play(item)}>
              <span className="rel-list-num">{idx + 1}</span>
              <p className={`w100p one-line-overflow-ellipsis ${nowItem?.id === item.id ? 'active' : ''}`}>
                {item.name}
                {
                  item.alia && item.alia.length > 0 &&
                  <>({item.alia[0]})</>
                }
              </p>
              <p className="rel-list-item-min one-line-overflow-ellipsis">
                {
                  item.fee === 1 && <span className="origin-cover-type">VIP</span>
                }
                <span>{item.ar[0].name}</span>
                {item.al.name && <span>{' - ' + item.al.name}</span>}
              </p>
              {
                nowItem?.id === item.id &&
                <p className="abs-right-icon">{
                  playStatus ? otherPauseIcon : otherPlayIcon
                }</p>
              }
            </div>
          })
        }
      </div>
    </div>
  );
}

export default memo(SongList);
