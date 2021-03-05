import React, {memo, useState, useCallback, useEffect, useImperativeHandle} from "react";
import "./lists-list.scss";
import {useDispatch} from "react-redux";
import SwiperDiv from "../../../../components/Swiper/Swiper";
import AlbumListItem from "../../../../components/album-list-item/album-list-item";
import {setPlayList} from "../../../../store/palyList";
import {setPlayIdx} from "../../../../store/palyList/playListActionCreator";
import {usePlayData} from "../../../../utils/usePlayData";
import history from "../../../../router/history";

const ListsList = React.forwardRef((props, ref) => {
  const [swiperRef, setSwiperRef] = useState(null);
  const dispatch = useDispatch();
  const [songId, setSongId] = useState('');
  const {list} = usePlayData(songId)

  useEffect(() => {
    if (list.length > 0) {
      dispatch(setPlayList(list))
      history.push('/playlist')
    }
  }, [dispatch, list])

  /* 点击触发去播放 */
  const goPlay = useCallback((idx, minIdx) => {
    let allIdx = minIdx
    if (idx > 0) {
      for (let [countIdx, countItem] of Object.entries(props.data)) {
        if (countIdx >= idx) break
        allIdx += countItem.resources.length
      }
    }
    let ids = props.data.reduce((prev, item) => {
      let str = ''
      for (let minItem of item.resources) {
        str += (str ? ',' : '') + minItem.resourceId
      }
      return prev += (prev ? ',' : '') + str
    }, '')
    // console.log(ids,'==', songId, ids === songId);
    if (songId === ids) {
      dispatch(setPlayIdx(allIdx))
      return
    }
    setSongId(ids)
    dispatch(setPlayIdx(allIdx))
  }, [dispatch, songId, props.data])

  useImperativeHandle(ref, () => ({
    goPlay: (idx, minIdx) => goPlay(idx, minIdx)
  }))

  return (
    <div className="index-lists-list-ctx">
      <SwiperDiv
        option={{
          speed: 300,
          initialSlide: 0,
          spaceBetween: -35
        }}
        autoPlay={false}
        swiperID={'indexRecommend1'}
        swiperRef={swiperRef}
        setSwiperRef={setSwiperRef}
      >
        <div id={'indexRecommend1'}>
          {/* Additional required wrapper */}
          <div className="swiper-wrapper index-lists-swiper-wrapper">
            {
              props.data.map((mapItem, idx) => {
                return <div className="swiper-slide" key={idx}>
                  {
                    mapItem.resources.map((item, minIdx) => {
                      return <AlbumListItem key={item.resourceId}
                                            goPlay={() => goPlay(idx, minIdx)}
                                            item={item}/>
                    })
                  }
                </div>
              })
            }
          </div>
        </div>
      </SwiperDiv>
    </div>
  );
})

export default memo(ListsList);
