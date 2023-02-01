import React, { useState } from "react";
import CartContainer from "./CartContainer";
import Header from "./Header2";
import CreateContainer from "./CreateContainer";
import { useDispatch, useSelector } from "react-redux";
import { setCartIsOpen } from "../reducers/userSlice";
import OrderSuccessMessageModal from "./OrderSuccessMessageModal";

const CreatePage = () => {
  const { cart } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const [isOrderSuccessModal, setIsOrderSuccessModal] = useState(false);

  const closeCart = () => {
    const cartContainer = document.querySelector(".cart-container");
    cartContainer.classList.remove("open-cart");
    document.getElementById("background-overlay").style.backgroundColor =
      "rgba(0, 0, 0, 0)";

    const transitionDuration =
      parseFloat(
        window
          .getComputedStyle(cartContainer)
          .getPropertyValue("transition-duration")
      ) * 1000;
    setTimeout(() => {
      dispatch(setCartIsOpen(false));
      document.getElementById("background-overlay").style.display = "none";
    }, transitionDuration);
  };
  return (
    <>
      <div
        id="background-overlay"
        onClick={() => {
          if (cart.isOpen) closeCart();
        }}
      ></div>
      <Header />
      <CartContainer setIsOrderSuccessModal={setIsOrderSuccessModal} />
      <CreateContainer />

      {/* order successful modal */}
      {isOrderSuccessModal && (
        <OrderSuccessMessageModal
          setIsOrderSuccessModal={setIsOrderSuccessModal}
        />
      )}
    </>
  );
};

export default CreatePage;
