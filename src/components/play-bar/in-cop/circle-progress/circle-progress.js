import React, {memo} from 'react';
import "./circle-progress.scss";

function CircleProgress(props) {
  const progress = props.progress || 0
  const style = {
    left: progress <= 50 ? {} : {
      transform: `rotate(${(progress - 50) * 3.6}deg)`
    },
    right: progress <= 50 ? {
      transform: `rotate(${progress * 3.6}deg)`
    } : {
      transform: 'rotate(0deg)',
      background: '#262626'
    }
  }
  return (
    <div className="circle-progress-ctx">
      <div className="circle">
        <div className="circle_left" style={style.left}>
          <p className="clip_left">
          </p>
        </div>
        <div className="circle_right" style={style.right}>
          <p className="clip_right">
          </p>
        </div>
        <div className="mask flex-center-center">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default memo(CircleProgress);
