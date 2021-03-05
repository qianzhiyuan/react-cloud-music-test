import React, {memo, useState, useEffect, useRef, useCallback} from 'react';
import "./search-result.scss";
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import SwiperDiv from "../../components/Swiper/Swiper";
import {useDataApi} from "./getDataFromResult";
import {usePlayData} from "../../utils/usePlayData";
import {addPlayListAction, setPlayList} from "../../store/palyList";
import history from "../../router/history";
import {useToast} from "../../utils/useToast";
import {otherPauseIcon, otherPlayIcon} from "../../libs/font-icon";
import {setPlayIdx} from "../../store/palyList/playListActionCreator";

function SearchResult(props) {
  const dispatch = useDispatch();
  const {playLists, playIdx, playStatus} = useSelector(state => ({
    playLists: state.playList.playLists,
    playIdx: state.playList.playIdx,
    playStatus: state.play.playStatus
  }), shallowEqual)
  const searchText = decodeURIComponent(props?.match?.params?.search) || '';
  const currentSwiperRef = useRef(null)
  const [swiperRef, setSwiperRef] = useState(currentSwiperRef.current); // 导航
  const [swiperRef1, setSwiperRef1] = useState(null); // 下面内容
  const [{loading, changeIdxLock, selectIdx, navList, goMore},
    setSelectIdx, setGoMore] = useDataApi(searchText)
  const [songId, setSongId] = useState('');
  const {list} = usePlayData(songId)
  const {showToast} = useToast()

  const nowItem = playLists[playIdx] || null // 当前播放歌曲

  /* 更新导航的ref */
  useEffect(() => {
    currentSwiperRef.current = swiperRef
  }, [swiperRef])

  useEffect(() => {
    if (list.length > 0) {
      if (list.length === 1) {
        dispatch(addPlayListAction(list[0], 'play'))
      } else {
        dispatch(setPlayList(list))
        dispatch(setPlayIdx(0))
      }
      history.push('/playlist')
    }
    return () => {
      setSongId('')
    }
  }, [dispatch, list])

  /* 获取swiper实例&&监听 */
  const getSwiperRef = (ref) => {
    setSwiperRef1(ref)
    ref && ref.on('after-slide', (idx) => {
      setSelectIdx(idx);
      currentSwiperRef?.current?.slideTo(idx - 2)
    });
  }

  /* 切换nav */
  const changeItem = useCallback((idx) => {
    if (selectIdx === idx) return
    changeIdxLock.current = true
    setSelectIdx(idx);
    swiperRef && swiperRef.slideTo(idx - 2)
    swiperRef1 && swiperRef1.slideTo(idx)
    setTimeout(() => {
      changeIdxLock.current = false
    }, 50)
  }, [selectIdx, changeIdxLock, setSelectIdx, swiperRef, swiperRef1])

  /* 后退 */
  function goBack() {
    props.history.goBack();
  }

  /* 过滤数量 */
  function filterNum(count) {
    let num = parseInt(count)
    if (num < 9999) return num
    else {
      let number = (num / 10000).toFixed(1)
      return number.replace('.0', '') + '万'
    }
  }

  /* scroll div */
  function scrollDiv(e) {
    if (changeIdxLock.current) return;
    if (selectIdx === 0) return
    let aimClass = ''
    aimClass = selectIdx === 1 ? '.search-result-list' : aimClass
    aimClass = selectIdx === 2 ? '.search-song-list' : aimClass
    let aimParent = document.getElementById('searchResultScrollCtxId1')
    let aim = e.target.querySelector(aimClass)
    let height = (aimParent.clientHeight || 0) + (aimParent.offsetTop || 0)
    let rect = aim && aim.getBoundingClientRect()
    let bottom = (rect && rect.bottom) || 0
    if (bottom < height && !changeIdxLock.current) { // 到底了啊
      // console.log('到底了啊');
      changeIdxLock.current = true
      !goMore && setGoMore(true)
    }
  }

  /* 播放 */
  const playThis = useCallback((item) => {
    if (!item.canPlay) {
      showToast('暂无版权')
      return
    }
    setSongId(String(item.id))
  }, [showToast])

  /* 播放全部 */
  const playAll = useCallback((list) => {
    let newList = list.filter(item => item.canPlay)
    if (newList.length === 0) {
      showToast('当前专辑无版权')
      return;
    }
    let ids = newList.reduce((prev, val) => {
      return prev += (prev ? ',' : '') + val.id
    }, '')
    setSongId(ids)
  }, [showToast])

  const linkList = useCallback((id) => {
    history.push('/songlist/' + id)
  }, [])

  /* render data */
  const renderNavData = useCallback((item) => {
    let renderHtml = null
    let renderItem = navList[selectIdx]?.data
    // renderItem && console.log(renderItem, item);
    switch (item) {
      // 综合 1018
      case '1018':
        const song = renderItem?.song
        const playList = renderItem?.playList
        // console.log(renderItem);
        renderHtml = <>
          { // 单曲
            song &&
            <div className="search-result-list" key={item.id}>
              <p className="search-result-list-top flex-between-center">
                <span>单曲</span>
                <span className="right-play-icon" onClick={() => playAll(song.songs)}>
                  {otherPlayIcon}
                </span>
              </p>
              {
                song.songs.map(item => {
                  const disableItem = !item.canPlay ? 'disabled-list-item' : ''
                  const isActive = item.id === nowItem?.id
                  const isActiveCls = isActive ? 'active' : ''
                  return <div className={`search-result-list-item flex-between-center ${disableItem}`}
                              key={item.id} onClick={() => playThis(item)}>
                    <div className="search-result-list-item-left">
                      <p className={`search-result-list-item-title one-line-overflow-ellipsis ${isActiveCls}`}>
                        {item.name}
                      </p>
                      <p className="search-result-list-item-author one-line-overflow-ellipsis">
                        {
                          item.fee === 1 &&
                          <span className="search-result-vip-tag">VIP</span>}
                        {
                          item.ar.length > 0 && item.ar.map((mItem, mIdx) => {
                            return <span key={mItem.id}>{mIdx !== 0 ? '/' : ''}{mItem.name}</span>
                          })
                        }
                        <span> - {item.al.name}</span>
                      </p>
                    </div>
                    { // 右边logo
                      isActive &&
                      <p className="abs-right-icon">{playStatus ? otherPauseIcon : otherPlayIcon}</p>
                    }
                  </div>
                })
              }
              {
                song.more &&
                <p className="search-result-list-bottom" onClick={() => changeItem(1)}>
                  {song.moreText}
                </p>
              }
            </div>
          }
          { // 歌单
            playList &&
            <div className="search-song-list">
              <p className="search-song-list-top flex-between-center">
                歌单
              </p>
              {
                playList.playLists.map(item => {
                  return <div className="search-song-list-item" key={item.id} onClick={() => linkList(item.id)}>
                    {/*<span className="search-song-left-img">.</span>*/}
                    <img className="search-song-left-img" src={item.coverImgUrl + '?param=100y100'} alt=""/>
                    <p className="one-line-overflow-ellipsis">{item.name}</p>
                    <p className="search-song-left-author more-line-overflow-ellipsis">
                      {item.trackCount}首音乐 by{item.creator.nickname}，播放{filterNum(item.playCount)}次
                      <br/>包含《{searchText}》
                    </p>
                  </div>
                })
              }
              {
                playList.more &&
                <p className="search-song-list-bottom" onClick={() => changeItem(2)}>
                  {playList.moreText}
                </p>
              }
            </div>
          }
        </>
        break
      // 单曲 1
      case '1':
        let songItem = renderItem?.songs
        renderHtml = songItem ? <>
          <div className="search-result-list" key={item}>
            <p className="search-result-list-top flex-between-center">
              <span>单曲</span>
              <span className="right-play-icon" onClick={() => playAll(songItem)}>
                {otherPlayIcon}
              </span>
            </p>
            {
              songItem.map(item => {
                const disableItem = !item.canPlay ? 'disabled-list-item' : ''
                const isActive = item.id === nowItem?.id
                const isActiveCls = isActive ? 'active' : ''
                return <div className={`search-result-list-item flex-between-center ${disableItem}`}
                            key={item.id} onClick={() => playThis(item)}>
                  <div className="search-result-list-item-left">
                    <p className={`search-result-list-item-title one-line-overflow-ellipsis ${isActiveCls}`}>
                      {item.name}
                    </p>
                    <p className="search-result-list-item-author one-line-overflow-ellipsis">
                      {item.fee === 1 && <span className="search-result-vip-tag">VIP</span>}
                      {
                        item.ar.length > 0 && item.ar.map((mItem, mIdx) => {
                          return <span key={mItem.id}>{mIdx !== 0 ? '/' : ''}{mItem.name}</span>
                        })
                      }
                      <span> - {item.al.name}</span>
                    </p>
                  </div>
                  { // 右边logo
                    isActive &&
                    <p className="abs-right-icon">{playStatus ? otherPauseIcon : otherPlayIcon}</p>
                  }
                </div>
              })
            }
            {
              loading && selectIdx === 1 &&
              <p className="result-loading-ctx">正在加载中</p>
            }
          </div>
        </> : null
        break
      // 歌单 1000
      case '1000':
        let playListItem = renderItem?.playlists
        renderHtml = playListItem ? <>
          <div className="search-song-list" style={{marginTop: 0}}>
            {
              playListItem.map(item => {
                return <div className="search-song-list-item" key={item.id}
                            onClick={() => linkList(item.id)}>
                  <img className="search-song-left-img" src={item.coverImgUrl + '?param=100y100'} alt=""/>
                  <p className="one-line-overflow-ellipsis">{item.name}</p>
                  <p className="search-song-left-author more-line-overflow-ellipsis">
                    {item.trackCount}首音乐 by {item.creator.nickname}，播放{filterNum(item.playCount)}次
                  </p>
                </div>
              })
            }
            {
              loading && selectIdx === 2 &&
              <p className="result-loading-ctx">正在加载中</p>
            }
          </div>
        </> : null
        break
      default:
        renderHtml = <div className="default">暂无此功能</div>
    }
    return renderHtml
  }, [changeItem, playThis, linkList, playAll, loading, navList, searchText, selectIdx, playStatus, nowItem])

  return (
    <div className="search-result-ctx">
      {/* top */}
      <div className="search-result-top">
        <div className="flex-center-center" onClick={goBack}>
          <span className="search-result-left">く</span>
          <p className="search-result-input">{searchText}</p>
        </div>
        {/* scroll-nav */}
        <div className="search-result-scroll-ctx">
          <SwiperDiv option={{slidesPerView: 6}}
                     swiperID={'searchResultScrollCtxId'}
                     swiperRef={swiperRef}
                     setSwiperRef={setSwiperRef}>
            <div id="searchResultScrollCtxId" style={{width: '100%', height: '100%'}}>
              <div className="swiper-wrapper scroll-tab-nowrap">
                {
                  navList.map((item, idx) => {
                    return <div className={`swiper-slide scroll-tab-item ${selectIdx === idx ? 'active' : ''}`}
                                onClick={() => changeItem(idx)}
                                key={idx}>{item.name}</div>
                  })
                }
              </div>
            </div>
          </SwiperDiv>
        </div>
      </div>
      {/* scroll-content */}
      <div className="search-result-content">
        <SwiperDiv option={{loop: false}}
                   swiperID={'searchResultScrollCtxId1'}
                   swiperRef={swiperRef1}
                   setSwiperRef={ref => getSwiperRef(ref)}>
          <div id="searchResultScrollCtxId1" style={{width: '100%', height: '100%'}}>
            <div className="swiper-wrapper scroll-tab-nowrap listen-scroll-content">
              {
                navList.map((item, idx) => {
                  return <div className={"swiper-slide search-result-content-item" +
                  `${item.type === '1018' ? ' composite-div' : ''}`}
                              key={idx} onScroll={e => scrollDiv(e)}>{
                    renderNavData(item.type)
                  }</div>
                })
              }
            </div>
          </div>
        </SwiperDiv>
      </div>
    </div>
  );
}

export default memo(SearchResult);
