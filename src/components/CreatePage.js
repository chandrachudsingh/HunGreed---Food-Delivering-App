import React from "react";
import CartContainer from "./CartContainer";
import Header from "./Header2";
import CreateContainer from "./CreateContainer";
import { useDispatch } from "react-redux";
import { setCartIsOpen } from "../reducers/userSlice";

const CreatePage = () => {
  const dispatch = useDispatch();

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
      <div id="background-overlay" onClick={closeCart}></div>
      <Header />
      <CartContainer />
      <CreateContainer />
    </>
  );
};

export default CreatePage;
