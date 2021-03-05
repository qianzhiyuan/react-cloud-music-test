import React from 'react';
import "./lyric-list.scss";

class LyricList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      prevTimeName: 'time-00:00'
    }

    this.prevTime = null
    this.LyricListDom = React.createRef();
  }

  // 滚动到中间
  scrollToTop(name = 'time-00:00') {
    if (this.prevTime === name) return;
    let arr = document.getElementsByClassName(name)
    if (arr.length === 0) return
    const {lyricHeight} = this.props
    this.prevTime = name
    this.setState({
      prevTimeName: name
    })
    this.LyricListDom.current.scroll({
      top: arr[0].offsetTop - (lyricHeight / 2),
      behavior: "smooth"
    })
  }

  filterTimeToLyric(text) {
    let time = /(\d{2}):(\d{2})(.(\d+))?/ig.exec(text)
    let str = text.replace(/\[\d{2}:\d{2}(.\d+)?\]/ig, '')
    let timeStamp = '00:00'
    if (time) {
      timeStamp = `${time[1]}:${time[2]}`
    }
    return {
      time: timeStamp,
      text: str
    }
  }

  render() {
    const {lyric, lyricHeight} = this.props
    const paddingHeight = lyricHeight / 2
    const {prevTimeName} = this.state

    return (
      <div className="lyric-list-ctx" ref={this.LyricListDom} style={{padding: `${paddingHeight}px 0`}}>
        {
          lyric.length > 0 && !(lyric.length === 1 && !lyric[0]) ? lyric.map((item, idx) => {
            const {text, time} = this.filterTimeToLyric(item)
            return <p key={idx} className={
              `lyric-list-item ${!text ? 'hidden' : ''} time-${time} 
              ${prevTimeName === 'time-' + time ? 'active' : ''}`
            }>
              {text || '.'}
            </p>
          }) : '暂无歌词'
        }
      </div>
    );
  }
};

export default LyricList;
