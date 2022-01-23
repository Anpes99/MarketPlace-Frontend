import React from "react";
//import PropTypes from 'prop-types'
import { useState, useImperativeHandle } from "react";

const Notification = React.forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  /*Notification.propTypes = {
    errorTrue: PropTypes.bool.isRequired,
  }*/

  const createNotification = (isError, message) => {
    setIsVisible(true);
    setMessage(message);
    setIsError(isError);

    setTimeout(
      () => {
        setIsVisible(false);
      },
      props.timeout ? props.timeout : 5000
    );
  };

  useImperativeHandle(ref, () => {
    return { createNotification };
  });

  const notificationStyle = {
    color: "green",
    display: isVisible ? "" : "none",
  };

  const errorStyle = {
    color: "red",
    display: isVisible ? "" : "none",
  };

  if (message === null) {
    return null;
  }
  return <div style={isError ? errorStyle : notificationStyle}>{message}</div>;
});

export default Notification;
