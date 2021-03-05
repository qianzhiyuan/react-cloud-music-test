import React, {memo} from "react";
import "./standard-list.scss";
import AlbumItem from "../../../../components/album-rect-item/album-rect-item";

const StandardList = (props) => {
  return (
    <div className="index-list-inner-ctx">
      {
        props.data.map(item => {
          return <AlbumItem key={item.creativeId} item={item}/>
        })
      }
    </div>
  );
};

export default memo(StandardList);
