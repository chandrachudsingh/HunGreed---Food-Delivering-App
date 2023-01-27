import React, { useState } from "react";
import Header from "./Header";
import CartContainer from "./CartContainer";
import HeroSection from "./HeroSection";
import About from "./About";
import MenuSection from "./MenuSection";
import ServicesSection from "./ServicesSection";
import PremiumContainer from "./PremiumContainer";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { setCartIsOpen, setUserInfo } from "../reducers/userSlice";
import MessageModal from "./MessageModal";
import { fetchUserData } from "../utils/firebaseFunctions";

const Home = () => {
  const { userInfo } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const modalDuration = 3000;
  const [joinSuccess, setJoinSuccess] = useState(false);

  const fetchUserDetails = async (uid) => {
    const data = await fetchUserData(uid);
    dispatch(setUserInfo(data));
  };

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
      {userInfo?.accountType === "local" && !joinSuccess && (
        <PremiumContainer
          setJoinSuccess={setJoinSuccess}
          fetchUserDetails={fetchUserDetails}
        />
      )}
      {joinSuccess && (
        <MessageModal
          modalDuration={modalDuration}
          type={"success"}
          message={"Congratulations!! You are now a premium member."}
          page={"premium"}
        />
      )}
      <Footer />
    </>
  );
};

export default Home;
