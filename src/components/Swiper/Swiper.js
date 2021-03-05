import React, {memo, useEffect} from 'react';
import './Swiper.scss';
import Swiper from "tiny-swiper";

const SwiperDiv = (props) => {
  useEffect(() => {
    if (props.swiperRef) return false
    let bannerSwiper = Swiper('#' + props.swiperID, {
      ...props.option
    })
    props.setSwiperRef(bannerSwiper);
    if (props.domRef) {
      props.domRef.current = bannerSwiper
    }
    return () => {
      props.swiperRef && props.swiperRef.destroy();
    }
  })

  return (
    <>{props.children}</>
  );
};

export default memo(SwiperDiv);
