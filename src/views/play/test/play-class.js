import React from 'react';
import "../play.scss";
import PlayProgressBar from "../in-cop/play-progress-bar/play-progress-bar";
import RotateMusicPic from "../in-cop/rotate-music-pic/rotate-music-pic";
import LyricList from "../in-cop/lyric-list/lyric-list";
import PlayMusicList from "../in-cop/play-music-list/play-music-list";
import {formatTimeSecond} from "../../../utils/formatTime";

class Play extends React.PureComponent {
  constructor(props) {
    super(props);

    let lyric = "[00:00.000] 作词 : 李宗盛↵[00:00.503] 作曲 : 李宗盛↵[00:01.006] 编曲 : 李正帆↵[00:01.510]编曲 : 李正帆↵[00:33.530]你说你爱了不该爱的人↵[00:38.100]你的心中满是伤痕↵[00:41.750]你说你犯了不该犯的错↵[00:45.320]心中满是悔恨↵[00:48.720]你说你尝尽了生活的苦↵[00:51.840]找不到可以相信的人↵[00:55.240]你说你感到万分沮丧↵[00:58.670]甚至开始怀疑人生↵[01:03.820]早知道伤心总是难免的↵[01:07.440]你又何苦一往情深↵[01:11.130]因为爱情总是难舍难分↵[01:14.460]何必在意那一点点温存↵[01:17.860]要知道伤心总是难免的↵[01:21.560]在每一个梦醒时分↵[01:24.880]有些事情你现在不必问↵[01:28.450]有些人你永远不必等↵[01:35.330]↵[01:46.660]你说你爱了不该爱的人↵[01:51.150]你的心中满是伤痕↵[01:55.800]你说你犯了不该犯的错↵[01:59.230]心中满是悔恨↵[02:02.640]你说你尝尽了生活的苦↵[02:05.760]找不到可以相信的人↵[02:09.289]你说你感到万分沮丧↵[02:12.640]甚至开始怀疑人生↵[02:17.640]早知道伤心总是难免的↵[02:21.240]你又何苦一往情深↵[02:25.000]因为爱情总是难舍难分↵[02:28.390]何必在意那一点点温存↵[02:31.770]要知道伤心总是难免的↵[02:35.220]在每一个梦醒时分↵[02:38.840]有些事情你现在不必问↵[02:42.290]有些人你永远不必等↵[02:49.570]↵[03:00.400]早知道伤心总是难免的↵[03:03.140]你又何苦一往情深↵[03:06.630]因为爱情总是难舍难分↵[03:10.150]何必在意那一点点温存↵[03:13.410]要知道伤心总是难免的↵[03:17.130]在每一个梦醒时分↵[03:20.560]有些事情你现在不必问↵[03:24.060]有些人你永远不必等↵"

    this.state = {
      info: `http://120.78.201.242/test1.mp3`,
      lyric: lyric.split('↵'),
      lyricHeight: 0, // 歌词div高度
      showLyric: false, // 切换歌词列表，默认歌曲图
      playStatus: false, // 当前的播放状态
      playTime: '', // 当前播放时间(mm:ss)
      allTime: '', // 总播放时间(mm:ss)
      currentTime: 0, // 当前播放时间(s)
      allTimeStamp: 0, // 总播放时间(s)
      progressPercent: 0, // 播放进度(%)
      showAlert: false, // 是否展示播放列表
    }

    this.musicRef = React.createRef();
    this.LyricDom = React.createRef();
  }

  componentDidMount() {
    let dom = document.getElementById('playLyricDiv')
    this.setState({lyricHeight: dom.clientHeight})
  }

  // 切换播放状态
  togglePlayStatus() {
    const audio = this.musicRef.current
    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
    }
  }

  // 切换歌曲图/歌词展示
  toggleLyricDisplay() {
    this.setState({showLyric: !this.state.showLyric})
  }

  // 存歌曲播放/暂停
  runOrStopForStatus() {
    this.setState({playStatus: !this.state.playStatus})
  }

  // 当currentTime更新时会触发timeupdate事件。
  // 同步歌词、播放进度
  musicTimeUpdate(e, modifyCurrentTime = 0) {
    const duration = e.target.duration
    const currentTime = modifyCurrentTime || e.target.currentTime // 单位是秒
    const playTime = formatTimeSecond(currentTime, 'mm:ss')
    if (e && !e.target.paused && this.LyricDom.current) { // 同步歌词
      this.LyricDom.current.scrollToTop('time-' + formatTimeSecond(currentTime + 0.5, 'mm:ss'))
    }
    this.setState({
      playTime: playTime, // 当前播放时间
      allTime: formatTimeSecond(duration, 'mm:ss'), // 总播放时间
      allTimeStamp: duration,
      progressPercent: (currentTime / duration) * 100, // 播放进度
    })
  }

  // 手动修改audio播放进度
  changeCurrent = (val) => {
    const {allTimeStamp} = this.state
    const audio = this.musicRef.current
    // 获取修改进度后的秒数
    audio.currentTime = allTimeStamp * val * 0.01
  }

  toggleShowAlert = () => {
    this.setState({showAlert: !this.state.showAlert})
  }

  render() {
    const {
      info, playStatus, playTime, lyric, lyricHeight, showLyric,
      allTime, allTimeStamp, progressPercent
    } = this.state;

    return (
      <div className="play-container">

        {/* header */}
        <div className="play-ctx-header">
          <p className="play-header-l flex-center-center">&lt;</p>
          <div className="play-header-t">
            <p className="play-header-title one-line-overflow-ellipsis">title</p>
            <p className="one-line-overflow-ellipsis">description</p>
          </div>
          <p className="play-header-r">.</p>
        </div>
        <p className="play-ctx-header-block" data-message={'顶部占位'}>.</p>

        {/* 歌曲旋转中心/歌词 */}
        <div id="playLyricDiv"
             className="play-ctx-content flex-center-center"
             style={{height: lyricHeight === 0 ? 'auto' : lyricHeight}}
             onClick={() => this.toggleLyricDisplay()}>
          <div className="absolute-ctx flex-center-center"
               style={{zIndex: !showLyric ? 0 : -1}} data-message={'歌曲图'}>
            <RotateMusicPic lyricHeight={lyricHeight} playStatus={playStatus}/>
          </div>
          <div className="absolute-ctx flex-center-center"
               style={{zIndex: showLyric ? 0 : -1}} data-message={'歌词列表'}>
            <LyricList ref={this.LyricDom} lyricHeight={lyricHeight} lyric={lyric}/>
          </div>
        </div>

        <p className="play-ctx-footer-block" data-message={'底部占位'}>.</p>
        {/* 底部 */}
        <div className="play-ctx-footer">
          <p className="play-music-info-btn flex-between-center">
            <span>喜</span>
            <span>下</span>
            <span>唱</span>
            <span>评</span>
            <span>更</span>
          </p>
          <PlayProgressBar progressPercent={progressPercent}
                           playTime={playTime}
                           allTime={allTime}
                           allTimeStamp={allTimeStamp}
                           changeCurrent={this.changeCurrent}/>
          <audio id="audio" ref={this.musicRef}
                 src={info} controls={true} autoPlay={false} loop={true}
                 onPlay={() => this.runOrStopForStatus()}
                 onPause={() => this.runOrStopForStatus()}
                 onCanPlay={e => this.musicTimeUpdate(e)}
                 onTimeUpdate={(e) => this.musicTimeUpdate(e)}
          />
          <div className="play-music-control flex-between-center">
            <span>播放方式</span>
            <span>上一首</span>
            <span className="play-pause-btn" onClick={() => this.togglePlayStatus()}>播放</span>
            <span>下一首</span>
            <span>播放列表</span>
          </div>
        </div>

        {/* 播放列表 */}
        {
          this.state.showAlert &&
          <PlayMusicList toggleShowAlert={this.toggleShowAlert}/>
        }
      </div>
    );
  }
};

export default Play;
