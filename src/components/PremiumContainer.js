import React, { useRef } from "react";
import Premium from "../Images/premium.png";
import { MdClose, MdArrowUpward } from "react-icons/md";
import { TiArrowRightThick } from "react-icons/ti";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../firebase.config";
import { joinUserPremium } from "../utils/firebaseFunctions";
import { useSelector } from "react-redux";

const PremiumContainer = ({ setJoinSuccess, fetchUserDetails, closeMenu }) => {
  const { isMenuOpen } = useSelector((state) => state.userData);
  const [user] = useAuthState(firebaseAuth);

  const premiumContainerRef = useRef();
  const openPremiumBtnRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const openContainer = () => {
    setIsOpen(true);
    premiumContainerRef.current.classList.add("open-premium-container");
  };

  const closeContainer = () => {
    setIsOpen(false);
    premiumContainerRef.current.classList.remove("open-premium-container");
  };

  const joinPremium = async (uid) => {
    setJoinSuccess(true);
    await joinUserPremium(uid);
    fetchUserDetails(uid);
  };

  return (
    <div
      className="premium-container"
      ref={premiumContainerRef}
      onClick={() => {
        if (user && isMenuOpen) {
          closeMenu();
        }
      }}
    >
      <button
        className="open-premium-btn"
        onClick={isOpen ? closeContainer : openContainer}
        ref={openPremiumBtnRef}
      >
        {isOpen ? <MdClose /> : <MdArrowUpward />}
      </button>
      <h3 className="premium-heading">Join Premium Now!!</h3>
      <div className="premium-benefits">
        <div className="premium-img">
          <img src={Premium} alt="" />
        </div>
        <div className="benefits-list">
          <h4>Benefits</h4>
          <ul>
            <li>
              <TiArrowRightThick /> 5% cashback
            </li>
            <li>
              <TiArrowRightThick /> Free deliveries
            </li>
            <li>
              <TiArrowRightThick /> and more
            </li>
          </ul>
        </div>
      </div>
      <button
        className="join-premium-btn"
        onClick={() => joinPremium(user.email)}
      >
        Join
      </button>
    </div>
  );
};

export default PremiumContainer;
