import React, { useEffect, useRef } from "react";
import { MdCheckCircle, MdLogin } from "react-icons/md";

const MessageModal = ({ modalDuration, type, message }) => {
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
        <MdCheckCircle className="message-modal-icon" />
      ) : (
        <MdLogin className="message-modal-icon" />
      )}{" "}
      {message}
    </div>
  );
};

export default MessageModal;
