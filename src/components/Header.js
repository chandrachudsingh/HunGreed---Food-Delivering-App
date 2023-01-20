import React, { useState, useEffect, useRef } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { MdOutlineAdd, MdOutlineLogout } from "react-icons/md";
import { Link as LinkR } from "react-router-dom";
import Avatar from "../Images/avatar.png";
import { app } from "../firebase.config";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setCartIsOpen, setIsMenuOpen, setUser } from "../reducers/userSlice";
import { Link as LinkS, animateScroll as scroll } from "react-scroll";

const Header = () => {
  const {
    user,
    isMenuOpen,
    cart: { isOpen, cartItems },
  } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const userDropdownRef = useRef();
  const cartItemCountRef = useRef();
  const [offset, setOffset] = useState(-82);

  const login = async () => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    if (!user) {
      const {
        user: { providerData },
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

  function getNavHeight() {
    const nav = document.querySelector(".navbar");
    const navHeight = parseFloat(getComputedStyle(nav).height);
    setOffset(-navHeight);
  }

  const toggleHome = () => {
    scroll.scrollToTop({ smooth: true, duration: 500 });
  };

  useEffect(() => {
    window.addEventListener("resize", getNavHeight);
    getNavHeight();
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
          <LinkR to="/" className="logo-text" onClick={toggleHome}>
            H<span className="small">un</span>G
            <span className="small">reed</span>
          </LinkR>
        </div>
        <ul className="navlinks-container" onClick={closeMenu}>
          <li className="navlinks">
            <LinkS
              to="home"
              activeClass="active"
              spy={true}
              smooth={true}
              offset={offset}
              duration={500}
              onClick={closeMenu}
            >
              home
            </LinkS>
          </li>
          <li className="navlinks">
            <LinkS
              to="menu"
              activeClass="active"
              spy={true}
              smooth={true}
              offset={offset}
              duration={500}
              onClick={closeMenu}
            >
              menu
            </LinkS>
          </li>
          <li className="navlinks">
            <LinkS
              to="about"
              activeClass="active"
              spy={true}
              smooth={true}
              offset={offset}
              duration={500}
              onClick={closeMenu}
            >
              about us
            </LinkS>
          </li>
          <li className="navlinks">
            <LinkS
              to="services"
              activeClass="active"
              spy={true}
              smooth={true}
              offset={offset}
              duration={500}
              onClick={closeMenu}
            >
              services
            </LinkS>
          </li>
        </ul>
        <button className="cart" onClick={openCart}>
          <MdShoppingBasket />
          {cartItems && cartItems.length > 0 && (
            <div className="cart-itemCount">
              <p ref={cartItemCountRef}></p>
            </div>
          )}
        </button>
        <div className="user-profile">
          <button className="user-profile-btn">
            <img
              src={user ? user.photoURL : Avatar}
              alt="user-profile"
              onClick={login}
            />
          </button>
          <div
            ref={userDropdownRef}
            className={`user-dropdown-menu ${isMenuOpen && "openMenu"}`}
          >
            {/* administration id */}
            {user && user.email === "chandrachudsingh81@gmail.com" && (
              <LinkR to="/createItem" onClick={closeMenu}>
                New Item <MdOutlineAdd />
              </LinkR>
            )}
            <ul className="mobile-view-list">
              <li>
                <LinkS
                  to="home"
                  spy={true}
                  smooth={true}
                  offset={offset}
                  duration={500}
                  onClick={closeMenu}
                >
                  Home
                </LinkS>
              </li>
              <li>
                <LinkS
                  to="menu"
                  spy={true}
                  smooth={true}
                  offset={offset}
                  duration={500}
                  onClick={closeMenu}
                >
                  Menu
                </LinkS>
              </li>
              <li>
                <LinkS
                  to="about"
                  spy={true}
                  smooth={true}
                  offset={offset}
                  duration={500}
                  onClick={closeMenu}
                >
                  About Us
                </LinkS>
              </li>
              <li>
                <LinkS
                  to="services"
                  spy={true}
                  smooth={true}
                  offset={offset}
                  duration={500}
                  onClick={closeMenu}
                >
                  Services
                </LinkS>
              </li>
            </ul>
            <button
              className="logout-btn"
              onClick={() => {
                logout();
                closeMenu();
              }}
            >
              Logout <MdOutlineLogout />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
