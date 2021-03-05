import React from 'react';
import styled from "./play.module.scss";
import PlayProgressBar from "../in-cop/play-progress-bar/play-progress-bar";
// import {PlayDiv} from "./in-cop/palyList-style";

class Play2 extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      run: true
    }
  }

  runOrStop() {
    const {run} = this.state
    this.setState({
      run: !run,
    })
  }

  render() {
    const {run} = this.state;

    return (
      <div className={styled.playContainer}>

        {/* header */}
        <div className={styled.playCtxHeader}>
          <p className={styled.playHeaderL + ' flex-center-center'}>&lt;</p>
          <div className={styled.playHeaderT}>
            <p className={styled.playHeaderTitle + ' one-line-overflow-ellipsis'}>title</p>
            <p className="one-line-overflow-ellipsis">description</p>
          </div>
          <p className={styled.playHeaderR}>.</p>
        </div>

        {/* 歌曲旋转中心 runState={run} */}
        <div className={styled.playCtxContent + " flex-center-center"}>
          <div className={styled.playRotateRound + ' ' + styled.playRun}
               style={{
                 'animationPlayState': run ? 'running' : 'paused'
               }}
               ref={this.rotateRef}
          ><span>.</span></div>
        </div>

        {/* 底部 */}
        <div className={styled.playCtxFooter}>
          <p className={styled.playMusicInfoBtn + " flex-between-center"}>
            <span>喜</span>
            <span>下</span>
            <span>唱</span>
            <span>评</span>
            <span>更</span>
          </p>
          <PlayProgressBar/>
          <div className={styled.playMusicControl + " flex-between-center"}>
            <span>播放方式</span>
            <span>上一首</span>
            <span className={styled.playPauseBtn} onClick={() => this.runOrStop()}>播放</span>
            <span>下一首</span>
            <span>播放列表</span>
          </div>
        </div>
      </div>
    );
  }
};

export default Play2;
