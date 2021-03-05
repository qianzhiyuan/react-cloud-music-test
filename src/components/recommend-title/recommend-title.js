import React, {memo} from 'react';
import './recommend-title.scss';

const RecommendTitle = (props) => {
  return (
    <div className="index-recommend-title">
      {
        props.minTitle &&
        <p className="min-recommend-font">{props.minTitle}</p>
      }
      <div className="flex-between-center">
        {props.title || 'title'}
        {
          props.moreText &&
          <p className="look-more-btn flex-center-center">
            {props.moreText}
          </p>
        }
      </div>
    </div>
  );
};

export default memo(RecommendTitle);
