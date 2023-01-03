import React, { useEffect, useRef } from "react";

const ItemAddedModal = ({ modalDuration }) => {
  const successModalRef = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      successModalRef.current.classList.add("open-success-modal");
    }, 1);
    const timeout2 = setTimeout(() => {
      successModalRef.current.classList.remove("open-success-modal");
    }, modalDuration);

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
    };
  }, []);
  return (
    <div className="success-modal" ref={successModalRef}>
      Item added to cart.
    </div>
  );
};

export default ItemAddedModal;
