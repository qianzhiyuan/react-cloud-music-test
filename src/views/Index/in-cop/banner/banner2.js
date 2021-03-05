import React, {memo, useState} from 'react';
import './banner.scss';
import SwiperDiv from "../../../../components/Swiper/Swiper";

const Banner = () => {
  const [swiperRef, setSwiperRef] = useState(null);

  const imgArr = [
    `http://p1.music.126.net/AqMi2oRUZDtiGMe0ZCoJGw==/109951165685125946.jpg?imageView&quality=89`,
    `http://p1.music.126.net/fgipRnHWylrgXc_C40Gj6Q==/109951165685142807.jpg?imageView&quality=89`,
    `http://p1.music.126.net/hXWgxIz7w3Q4cqvU1Sxijw==/109951165685171719.jpg?imageView&quality=89`,
  ]

  return (
    <SwiperDiv
      option={{
        speed: 300,
        loop: true,
        initialSlide: 0,
        spaceBetween: 0
      }}
      autoPlay={false}
      swiperID={'indexBannerSwiper1'}
      swiperRef={swiperRef}
      setSwiperRef={setSwiperRef}
    >
      <div className="index-banner-ctx" id={'indexBannerSwiper1'}>
        {/* Additional required wrapper */}
        <div className="swiper-wrapper">
          {
            imgArr.map((item, idx) => {
              return <div className="swiper-slide" key={item}>
                <img className=""
                     src={item} alt=""/>
              </div>
            })
          }
        </div>
      </div>
    </SwiperDiv>
  );
};

export default memo(Banner);
