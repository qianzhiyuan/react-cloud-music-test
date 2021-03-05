import React, {memo, useRef} from 'react';
import './index-list.scss'
import RecommendTitle from "../../../../components/recommend-title/recommend-title";
import StandardList from "../index-list-mode/standard-list";
import ListsList from "../index-list-mode/lists-list";
import {useToast} from "../../../../utils/useToast";

const IndexList = (props) => {
  const type = props.type || 'standard';
  const data = props.data || [];
  const listRef = useRef(null)
  const {showToast} = useToast()

  const playAll = () => {
    listRef && listRef?.current?.goPlay(0, 0)
  }

  const showTips = () => {
    showToast('暂无此功能')
  }

  return (
    <div className="index-list-outer-ctx">
      <RecommendTitle minTitle={props.minTitle || ''}
                      title={props.title || '推荐歌单'}
                      moreText={
                        type === 'list' ?
                          <span onClick={playAll}>播放全部</span> :
                          <span onClick={showTips}>更多</span>
                      }/>
      {
        type === 'standard' ?  <StandardList data={data}/> : null
      }
      {type === 'list' ?  <ListsList ref={listRef} data={data}/> : null}
    </div>
  );
};

export default memo(IndexList);
