import React, {memo} from "react";
import "./footer.scss";
import {homeIconActive, homeIcon, personIcon, personIconActive} from "../../libs/font-icon";

function Footer(props) {
  const arr = [
    {
      name: '发现',
      icon: homeIcon,
      activeIcon: homeIconActive,
      path: '/index'
    },
    {
      name: '我的',
      icon: personIcon,
      activeIcon: personIconActive,
      path: '/my'
    }
  ]

  const linkOther = (item) => {
    if (item.path === '/my' && !props.showMy) {
      props.toggleMyPage(true)
    } else if (item.path === '/index' && props.showMy) {
      props.toggleMyPage(false)
    }
  }

  return (
    <div className="footer-fixed-ctx">
      {
        arr.map(item => {
          return (
            <div className="footer-fixed-item" key={item.path}
                 onClick={() => linkOther(item)}>
              <p className="img-tag-div">
                {props.type === item.path ? item.activeIcon : item.icon}
              </p>
              {item.name}
            </div>
          )
        })
      }
    </div>
  )
}

export default memo(Footer);
