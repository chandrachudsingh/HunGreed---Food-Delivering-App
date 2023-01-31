import React, { useState, useEffect, useRef } from "react";
import {
  MdShoppingBasket,
  MdAdd,
  MdLogin,
  MdOutlineAccountBalanceWallet,
  MdOutlineLogout,
} from "react-icons/md";
import { BiRupee } from "react-icons/bi";
import { Link, Link as LinkR } from "react-router-dom";
import Avatar from "../Images/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserInfo,
  setIsMenuOpen,
  setCartIsOpen,
} from "../reducers/userSlice";
import { Link as LinkS, animateScroll as scroll } from "react-scroll";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../firebase.config";
import { signOut } from "firebase/auth";
import { useCallback } from "react";

const Header = () => {
  const {
    userInfo,
    isMenuOpen,
    cart: { isOpen, cartItems },
  } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const [user] = useAuthState(firebaseAuth);

  const userDropdownRef = useRef();
  const cartItemCountRef = useRef();
  const cartIconContainerRef = useRef();
  const loginBtnRef = useRef();
  const [offset, setOffset] = useState(-82);
  const [loginBtnText, setLoginBtnText] = useState(true);

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
  };

  const openCart = () => {
    dispatch(setCartIsOpen(!isOpen));
    document.getElementById("cart-overlay").style.display = "block";
    setTimeout(() => {
      document.getElementById("cart-overlay").style.backgroundColor =
        "rgba(0, 0, 0, 0.5)";
    }, 0);
  };

  const totalQty = useCallback(() => {
    let sum = 0;
    cartItems.forEach((item) => {
      sum += item.qty;
    });
    cartItemCountRef.current.innerText = sum;
  }, [cartItems]);

  function getNavHeight() {
    const nav = document.querySelector(".navbar");
    const navHeight = parseFloat(getComputedStyle(nav).height);
    setOffset(-navHeight);
  }

  const changeHeaderAttrs = () => {
    const pageWidth = window.innerWidth;
    const loginBtnWidth = parseInt(
      window.getComputedStyle(loginBtnRef.current).width
    );

    if (pageWidth > 640) {
      cartIconContainerRef.current.style.width = "fit-content";
    } else if (pageWidth <= 640) {
      cartIconContainerRef.current.style.width = `${loginBtnWidth}px`;
    }

    if (pageWidth > 320) {
      setLoginBtnText(true);
    } else {
      setLoginBtnText(false);
    }
  };

  const toggleHome = () => {
    scroll.scrollToTop({ smooth: true, duration: 500 });
  };

  const setAltUserImg = (e) => {
    e.target.src = Avatar;
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      getNavHeight();
      if (loginBtnRef.current) {
        changeHeaderAttrs();
      }
    });
    getNavHeight();
    if (loginBtnRef.current) {
      changeHeaderAttrs();
    }
  }, []);

  useEffect(() => {
    if (cartItemCountRef.current) {
      totalQty();
    }
  }, [totalQty]);

  useEffect(() => {
    if (user) {
      // to set cart icon to its original size
      cartIconContainerRef.current.style.width = "fit-content";
    }
  });

  return (
    <nav
      className="navbar"
      // onClick={() => {
      //   if (user && isMenuOpen) {
      //     closeMenu();
      //   }
      // }}
    >
      <div className="nav-container">
        <div className="brand-logo">
          <LinkR
            to="/"
            className="logo-text"
            onClick={() => {
              toggleHome();
              if (user && isMenuOpen) {
                closeMenu();
              }
            }}
          >
            H<span className="small">un</span>G
            <span className="small">reed</span>
          </LinkR>
        </div>
        <ul
          className="navlinks-container"
          onClick={() => {
            if (user) {
              closeMenu();
            }
          }}
        >
          <li className="navlinks">
            <LinkS
              to="home"
              activeClass="active"
              spy={true}
              smooth={true}
              offset={offset}
              duration={500}
              onClick={() => {
                if (user) {
                  closeMenu();
                }
              }}
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
              onClick={() => {
                if (user) {
                  closeMenu();
                }
              }}
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
              onClick={() => {
                if (user) {
                  closeMenu();
                }
              }}
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
              onClick={() => {
                if (user) {
                  closeMenu();
                }
              }}
            >
              services
            </LinkS>
          </li>
        </ul>
        <div className="cartIcon-container" ref={cartIconContainerRef}>
          <button
            className="cart"
            onClick={() => {
              openCart();
              if (user) {
                closeMenu();
              }
            }}
          >
            <MdShoppingBasket />
            {cartItems && cartItems.length > 0 && (
              <div className="cart-itemCount">
                <p ref={cartItemCountRef}></p>
              </div>
            )}
          </button>
        </div>
        {user ? (
          <div className="user-profile">
            <button className="user-profile-btn">
              <img
                src={user.photoURL || Avatar}
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
              {/* admin only */}
              {userInfo && userInfo.accountType === "admin" && (
                <LinkR
                  to="/createItem"
                  onClick={() => dispatch(setIsMenuOpen(false))}
                >
                  <MdAdd />
                  New Item
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
              <button className="logout-btn" onClick={logout}>
                <MdOutlineLogout />
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/signin" className="login-btn" ref={loginBtnRef}>
            {loginBtnText ? "Sign In" : <MdLogin />}
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
