import React, {memo, useState, useRef, useEffect} from 'react';
import './banner.scss';
import Swiper from "tiny-swiper";
import SwiperPluginPagination from 'tiny-swiper/lib/modules/pagination.min.js'


const Banner = () => {
  const isLock = useRef(false)
  const [swiperRef, setSwiperRef] = useState(null);
  const [loopTimeRef, setLoopTimeRef] = useState(null);

  useEffect(() => {
    if (swiperRef) return false
    let bannerSwiper = new Swiper('#indexBannerSwiper', {
      speed: 300,
      loop: true,
      initialSlide: 0,
      spaceBetween: 0,
      pagination: {
        el: ".swiper-plugin-pagination",
        clickable: true,
        bulletClass: "swiper-plugin-pagination__item",
        bulletActiveClass: "is-active"
      },
      plugins: [SwiperPluginPagination]
    })
    bannerSwiper.on('scroll', (index, state) => {
      isLock.current = index.isStart
    });
    setSwiperRef(bannerSwiper);
  }, [swiperRef, setSwiperRef])

  useEffect(() => {
    return () => {
      loopTimeRef && clearInterval(loopTimeRef);
      swiperRef && swiperRef.destroy();
    }
  }, [loopTimeRef])

  let imgOnLoad = (idx) => {
    idx === 1 && goLoop();
  }

  let goLoop = () => {
    if (!swiperRef) return false
    let loopTime = setInterval(() => {
      if (!isLock.current) {
        swiperRef.slideTo(swiperRef.state.index + 1, 300)
      }
    }, 5000)
    setLoopTimeRef(loopTime)
  }

  const imgArr = [
    `http://p1.music.126.net/AqMi2oRUZDtiGMe0ZCoJGw==/109951165685125946.jpg?imageView&quality=89`,
    `http://p1.music.126.net/fgipRnHWylrgXc_C40Gj6Q==/109951165685142807.jpg?imageView&quality=89`,
    `http://p1.music.126.net/hXWgxIz7w3Q4cqvU1Sxijw==/109951165685171719.jpg?imageView&quality=89`,
  ]

  return (
    <div className="index-banner-ctx" id={'indexBannerSwiper'}>
      {/*<div className="index-banner-imgs"></div>*/}

      {/* Additional required wrapper */}
      <div className="swiper-wrapper">
        {
          imgArr.map((item, idx) => {
            return <div className="swiper-slide" key={item}>
              <img className=""
                   onLoad={() => imgOnLoad(idx)}
                   src={item}  alt=""/>
            </div>
          })
        }
      </div>
      {/*If we need pagination*/}
      <div className="swiper-plugin-pagination flex-center-center"></div>
    </div>
  );
};

export default memo(Banner);
