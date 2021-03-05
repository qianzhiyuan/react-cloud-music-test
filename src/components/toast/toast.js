import React, {memo} from 'react';
import "./toast.scss";

function Toast(props) {
  return (
    <div className="toast-container">
      <p className="toast-text">{props.toastText || ''}</p>
    </div>
  );
}

export default memo(Toast);
