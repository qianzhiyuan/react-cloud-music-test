import {memo} from "react";
import "./album-list-item.scss"

function AlbumListItem(props) {
  const item = props.item;
  const width100 = {width: '100%', overflow: 'hidden'}

  const songName = item.resourceExtInfo?.songData?.name || item.uiElement?.mainTitle?.title
  const songAuthor = item.resourceExtInfo.songData.artists[0].name
  const content = item.resourceExtInfo?.commentSimpleData?.content

  return <div className="index-lists-list-item" key={item.id} onClick={props.goPlay}>
    {/* left */}
    <img className="index-lists-img-div" src={item.uiElement.image.imageUrl + '?param=140y140'} alt="."/>
    {/* center */}
    <div className="index-lists-text-div">
      {/* 标题 + author */}
      <div className="index-lists-text-line one-line-overflow-ellipsis">
        <span className="index-lists-text-title one-line-overflow-ellipsis">{songName}</span>
        <span className="index-lists-text-author one-line-overflow-ellipsis">- {songAuthor}</span>
      </div>
      {/* 描述 */}
      {
        content &&
        <p className="flex-center-left" style={width100}>
          {
            item.tag && false &&
            <span className="index-lists-text-tag flex-center-center">独家</span>
          }
          {
            content && <span className="one-line-overflow-ellipsis">
              {content}
            </span>
          }
        </p>
      }
    </div>
    <div className="index-lists-r-div">
    </div>
  </div>

}

export default memo(AlbumListItem);
