import React, { useEffect, useRef } from "react";
import {
  MdCheckCircle,
  MdErrorOutline,
  MdLogin,
  MdOutlineGppGood,
  MdThumbUp,
} from "react-icons/md";

const MessageModal = ({ modalDuration, type, message, page }) => {
  const modalRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      modalRef.current && modalRef.current.classList.add("open-message-modal");
    }, 1);
    setTimeout(() => {
      modalRef.current &&
        modalRef.current.classList.remove("open-message-modal");
    }, modalDuration);
  }, []);
  return (
    <div className={`message-modal ${type}-modal`} ref={modalRef}>
      {type === "success" ? (
        page === "signin" ? (
          <MdThumbUp className="message-modal-icon" />
        ) : page === "menu" ? (
          <MdCheckCircle className="message-modal-icon" />
        ) : (
          <MdOutlineGppGood className="message-modal-icon" />
        )
      ) : page === "signin" ? (
        <MdErrorOutline className="message-modal-icon" />
      ) : (
        <MdLogin className="message-modal-icon" />
      )}{" "}
      {message}
    </div>
  );
};

export default MessageModal;
