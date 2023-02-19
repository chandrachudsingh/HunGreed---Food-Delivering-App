import React, { useEffect, useRef } from "react";
import {
  MdShoppingBasket,
  MdOutlineLogout,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import { Link as LinkR } from "react-router-dom";
import Avatar from "../Images/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import {
  setCartIsOpen,
  setIsMenuOpen,
  setUserInfo,
} from "../reducers/userSlice";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../firebase.config";
import { BiRupee } from "react-icons/bi";
import { useCallback } from "react";

const Header = () => {
  const {
    userInfo,
    isMenuOpen,
    cart: { isOpen, cartItems },
  } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const userDropdownRef = useRef();
  const cartItemCountRef = useRef();

  const openMenu = () => {
    userDropdownRef.current.style.display = "flex";
    setTimeout(() => {
      dispatch(setIsMenuOpen(true));
    }, 0);
  };

  const closeMenu = () => {
    userDropdownRef.current.classList.remove("openMenu");

    const transitionDuration =
      parseFloat(
        window
          .getComputedStyle(userDropdownRef.current)
          .getPropertyValue("transition-duration")
      ) * 1000;
    setTimeout(() => {
      userDropdownRef.current.style.display = "none"; //for closing animation

      dispatch(setIsMenuOpen(false));
    }, transitionDuration);
  };

  const logout = () => {
    dispatch(setIsMenuOpen(false));
    dispatch(setUserInfo(null));
    signOut(firebaseAuth);
    window.location.href = "/";
  };

  const openCart = () => {
    dispatch(setCartIsOpen(!isOpen));
    document.getElementById("background-overlay").style.display = "block";
    setTimeout(() => {
      document.getElementById("background-overlay").style.backgroundColor =
        "rgba(0, 0, 0, 0.6)";
    }, 0);
  };

  const totalQty = useCallback(() => {
    let sum = 0;
    cartItems.forEach((item) => {
      sum += item.qty;
    });
    cartItemCountRef.current.innerText = sum;
  }, [cartItems]);

  const setAltUserImg = (e) => {
    e.target.src = Avatar;
  };

  useEffect(() => {
    if (cartItemCountRef.current) {
      totalQty();
    }
  }, [totalQty]);

  return (
    <nav
      className="navbar"
      onClick={() => {
        if (isMenuOpen) {
          closeMenu();
        }
      }}
    >
      <div className="nav-container">
        <div className="brand-logo">
          <LinkR to="/" className="logo-text">
            <span>H</span>
            <span className="small">un</span>
            <span>G</span>
            <span className="small">reed</span>
          </LinkR>
        </div>
        <div className="cartIcon-container2">
          <button className="cart" onClick={openCart}>
            <MdShoppingBasket />
            {cartItems && cartItems.length > 0 && (
              <div className="cart-itemCount">
                <p ref={cartItemCountRef}></p>
              </div>
            )}
          </button>
        </div>
        <div className="user-profile">
          <button className="user-profile-btn">
            <img
              src={userInfo?.image}
              alt="user-profile"
              onError={(e) => setAltUserImg(e)}
              onClick={() => (isMenuOpen ? closeMenu() : openMenu())}
            />
          </button>
          <div
            ref={userDropdownRef}
            className={`user-dropdown-menu ${isMenuOpen && "openMenu"}`}
          >
            <p className="user-name">
              {userInfo?.name?.split(" ").slice(0, 2).join(" ")}
              {userInfo?.accountType !== "local" && (
                <span>{userInfo?.accountType}</span>
              )}
            </p>
            {userInfo && (
              <p className="wallet">
                <span>
                  <MdOutlineAccountBalanceWallet className="yellow" /> Wallet
                </span>{" "}
                <span>
                  <BiRupee className="green" />
                  {userInfo?.wallet}
                </span>
              </p>
            )}
            <hr />
            <button className="logout-btn" onClick={logout}>
              <MdOutlineLogout />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
