import React, {memo, useCallback, useState, useEffect, useRef} from 'react';
import './banner.scss';
import {useDispatch} from "react-redux";
import SwiperDiv from "../../../../components/Swiper/Swiper";
import SwiperPluginPagination from 'tiny-swiper/lib/modules/pagination.min.js'
import SwiperPluginAutoPlay from 'tiny-swiper/lib/modules/autoPlay.min.js'
import {usePlayData} from "../../../../utils/usePlayData";
import {addPlayListAction} from "../../../../store/palyList";
import history from "../../../../router/history";
import {useToast} from "../../../../utils/useToast";

const Banner = (props) => {
  const dispatch = useDispatch();
  const [swiperRef, setSwiperRef] = useState(null);
  const BannerRef = useRef(null);
  const [songId, setSongId] = useState('');
  const {list} = usePlayData(songId)
  const {showToast} = useToast()

  useEffect(() => {
    if (list.length > 0) {
      dispatch(addPlayListAction(list[0], 'play'))
      history.push('/playlist')
    }
    return () => {
      setSongId('')
    }
  }, [list, dispatch])

  /* 点击banner功能 */
  let linkImg = useCallback((item) => {
    if (item.song) { // 当前存在歌曲
      setSongId(String(item?.song?.id))
    } else if (item.url) { // 跳转外部URL
      showToast('当前打开的是外链, 请注意')
      setTimeout(() => {
        window.location.href = item.url
      }, 2500)
    } else if (item.targetType === 10) { // 打开专辑页面
      showToast('暂无专辑功能')
    } else {
      showToast('暂无此功能')
    }
  }, [showToast])

  return (
    <SwiperDiv
      option={{
        speed: 300,
        loop: true,
        initialSlide: 0,
        spaceBetween: 0,
        autoplay: {
          delay: 3000
        },
        pagination: {
          el: ".swiper-plugin-pagination",
          clickable: true,
          bulletClass: "swiper-plugin-pagination__item",
          bulletActiveClass: "is-active"
        },
        plugins: [
          SwiperPluginPagination,
          SwiperPluginAutoPlay
        ]
      }}
      swiperID={'indexBannerSwiper'}
      swiperRef={swiperRef}
      setSwiperRef={setSwiperRef}
      autoPlay={true}
      domRef={BannerRef}
    >
      <div className="index-banner-ctx" id={'indexBannerSwiper'}>
        {/*<div className="index-banner-imgs"></div>*/}
        {/* Additional required wrapper */}
        <div className="swiper-wrapper">
          {
            props.banners.map(item => {
              return <div className="swiper-slide" key={item.bannerId}
                          onClick={() => linkImg(item)}>
                <img className="" src={item.pic + '?imageView&quality=89'} alt=""/>
              </div>
            })
          }
        </div>
        {/*If we need pagination*/}
        <div className="swiper-plugin-pagination flex-center-center"></div>
      </div>
    </SwiperDiv>
  );
};

export default memo(Banner);
