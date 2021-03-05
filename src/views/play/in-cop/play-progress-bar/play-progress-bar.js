import React from 'react';
import "./play-progress-bar.scss";
import {formatTimeSecond} from "../../../../utils/formatTime";

class PlayProgressBar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dragProgressVal: props.progressPercent || 0, // 手动修改进度条值
      dragCurrentVal: '00:00', // 手动修改歌曲current
    }

    this.changeProgress = false // 当前是否在主动修改进度条
  }

  // 手动修改进度
  changeMethods(e) {
    const {allTimeStamp} = this.props
    const val = e.target.value
    let wantToCurrentSecond = allTimeStamp * val * 0.01
    let wantToCurrentTime = formatTimeSecond(wantToCurrentSecond, 'mm:ss')
    this.changeProgress = true
    this.setState({
      dragProgressVal: val,
      dragCurrentVal: wantToCurrentTime
    })
  }

  // 获取修改的进度反馈给audio
  changeCurrentProgress(e) {
    this.changeProgress = false
    this.props.changeCurrent(e.target.value)
  }

  render() {
    const {allTime, playTime, progressPercent} = this.props
    const {dragProgressVal, dragCurrentVal} = this.state
    let left = this.changeProgress ? dragProgressVal : progressPercent

    return (
      <div className="play-music-progress flex-between-center">
        <span className="play-music-time-span">
          {(this.changeProgress ? dragCurrentVal : playTime)
          || '00:00'}
        </span>
        <div className="play-progress-ctx flex-center-center">
          <p className="play-progress-line">.</p>
          <div className="rel-line">
            <span className="play-progress-dot" style={{left: left + "%"}}>.</span>
          </div>
          <input onChange={e => this.changeMethods(e)}
                 onMouseUp={e => this.changeCurrentProgress(e)}
                 onTouchEnd={e => this.changeCurrentProgress(e)}
                 type="range"
                 value={this.changeProgress ? dragProgressVal : progressPercent}
                 min="0" max="100" step="any"/>
        </div>
        <span className="play-music-time-span">{allTime || '00:00'}</span>
      </div>
    );
  }
}

export default PlayProgressBar;
