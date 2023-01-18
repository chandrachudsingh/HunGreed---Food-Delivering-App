import React, { useEffect, useRef } from "react";
import { MdCheckCircle, MdLogin, MdOutlineGppGood } from "react-icons/md";
import { useSelector } from "react-redux";

const MessageModal = ({ modalDuration, type, message }) => {
  const { user } = useSelector((state) => state.userData);
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
        user ? (
          <MdOutlineGppGood className="message-modal-icon" />
        ) : (
          <MdCheckCircle className="message-modal-icon" />
        )
      ) : (
        <MdLogin className="message-modal-icon" />
      )}{" "}
      {message}
    </div>
  );
};

export default MessageModal;
