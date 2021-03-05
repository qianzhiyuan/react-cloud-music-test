import React, {memo} from 'react';
import './recommend-nav.scss'
import {useToast} from "../../../../utils/useToast";

const RecommendNav = (props) => {
  const {showToast} = useToast()

  const showTips = () => {
    showToast('暂无此功能')
  }

  return (
    <div className="index-recommend-ctx">

      <div className="index-recommend-list">
        { // ['每日推荐', '私人FM', '歌单', '排行榜', '直播', '电台']
          props.navList.map((item, idx) => {
            return <div className="index-recommend-item" key={item.id} onClick={showTips}>
              <p className="del-shadow">
                <img src={item.iconUrl} alt=""/>
              </p>
              <p className="recommend-text">{item.name}</p>
            </div>
          })
        }
      </div>

    </div>
  );
};

export default memo(RecommendNav);
