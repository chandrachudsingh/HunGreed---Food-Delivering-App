import React from "react";
import Header from "./Header";
import CartContainer from "./CartContainer";
import HeroSection from "./HeroSection";
import About from "./About";
import MenuSection from "./MenuSection";
import ServicesSection from "./ServicesSection";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { setCartIsOpen } from "../reducers/userSlice";

const Home = () => {
  const dispatch = useDispatch();

  const closeCart = () => {
    const cartContainer = document.querySelector(".cart-container");
    cartContainer.classList.remove("open-cart");
    document.getElementById("cart-overlay").style.backgroundColor =
      "rgba(0, 0, 0, 0)";

    const transitionDuration =
      parseFloat(
        window
          .getComputedStyle(cartContainer)
          .getPropertyValue("transition-duration")
      ) * 1000;
    setTimeout(() => {
      dispatch(setCartIsOpen(false));
      document.getElementById("cart-overlay").style.display = "none";
    }, transitionDuration);
  };
  return (
    <>
      <div id="cart-overlay" onClick={closeCart}></div>
      <Header />
      <CartContainer />
      <HeroSection />
      <MenuSection />
      <About />
      <ServicesSection />
      <Footer />
    </>
  );
};

export default Home;
