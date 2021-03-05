import React, {memo} from 'react';

const RotateMusicPic = (props) => {
  return (
    <div className={`play-rotate-round play-run`}
         style={{
           'animationPlayState': props.playStatus ? 'running' : 'paused',
           'width': props.lyricHeight / 2 + 'px',
           'height': props.lyricHeight / 2 + 'px',
         }}
    >
      <img src={props.nowPlayInfo?.al?.picUrl + '?param=140y140'} alt="."/>
    </div>
  );
};

export default memo(RotateMusicPic);
