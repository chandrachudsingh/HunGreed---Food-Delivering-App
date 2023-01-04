import React, { useEffect, useRef } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { MdOutlineAdd, MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import Avatar from "../Images/avatar.png";
import { app } from "../firebase.config";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setCartIsOpen, setIsMenuOpen, setUser } from "../reducers/userSlice";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const {
    user,
    isMenuOpen,
    cart: { isOpen, cartItems },
  } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const userDropdownRef = useRef();
  const cartItemCountRef = useRef();

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch(setUser(providerData[0]));

      // to persist state on refresh
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      isMenuOpen ? closeMenu() : openMenu();
    }
  };

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
    closeMenu();
    localStorage.clear();
    dispatch(setUser(null));
  };

  const openCart = () => {
    dispatch(setCartIsOpen(!isOpen));
    document.getElementById("cart-overlay").style.display = "block";
    setTimeout(() => {
      document.getElementById("cart-overlay").style.backgroundColor =
        "rgba(0, 0, 0, 0.5)";
    }, 0);
  };

  const totalQty = () => {
    let sum = 0;
    cartItems.forEach((item) => {
      sum += item.qty;
    });
    cartItemCountRef.current.innerText = sum;
  };

  function setNavHeight() {
    const nav = document.querySelector(".navbar");
    const root = document.querySelector(":root");
    root.style.setProperty("--nav-height", `${nav.clientHeight}px`);
  }

  useEffect(() => {
    window.addEventListener("resize", setNavHeight);
  }, []);

  useEffect(() => {
    if (cartItemCountRef.current) {
      totalQty();
    }
  }, [cartItems]);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="brand-logo">
          <Link to="/" className="logo-text">
            H<span className="small">un</span>G
            <span className="small">reed</span>
          </Link>
        </div>
        <ul className="navlinks-container" onClick={closeMenu}>
          <li className="navlinks">home</li>
          <li className="navlinks">menu</li>
          <li className="navlinks">about us</li>
          <li className="navlinks">service</li>
        </ul>
        <div className="cart" onClick={openCart}>
          <MdShoppingBasket />
          {cartItems && cartItems.length > 0 && (
            <div className="cart-itemCount">
              <p ref={cartItemCountRef}></p>
            </div>
          )}
        </div>
        <div className="user-profile">
          <img
            src={user ? user.photoURL : Avatar}
            alt="user-profile"
            onClick={login}
          />
          <div
            ref={userDropdownRef}
            className={`user-dropdown-menu ${isMenuOpen && "openMenu"}`}
          >
            {/* administration id */}
            {user && user.email === "chandrachudsingh81@gmail.com" && (
              <Link to="/createItem">
                <p onClick={closeMenu}>
                  New Item <MdOutlineAdd />
                </p>
              </Link>
            )}
            <ul className="mobile-view-list">
              <li onClick={closeMenu}>Home</li>
              <li onClick={closeMenu}>Menu</li>
              <li onClick={closeMenu}>About Us</li>
              <li onClick={closeMenu}>Service</li>
            </ul>
            <p
              className="logout-btn"
              onClick={() => {
                logout();
                closeMenu();
              }}
            >
              Logout <MdOutlineLogout />
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
