import React, {memo} from "react";
import "./album-rect-item.scss";
import history from "../../router/history";

const AlbumRectItem = (props) => {
  const item = props.item

  function getData () {
    history.push('/songlist/' + item.creativeId)
  }

  return (
    <div className="album-item-div" onClick={getData}>
      <img className="album-img-block" alt="."
         src={item.uiElement.image.imageUrl + '?param=140y140'} />
      <p className="album-item-text more-line-overflow-ellipsis">
        {item?.uiElement?.mainTitle?.title || ''}
      </p>
    </div>
  );
};

export default memo(AlbumRectItem);
