import React, { useState, useEffect, useRef } from "react";
import {
  MdShoppingBasket,
  MdOutlineAdd,
  MdLogin,
  MdOutlineLogout,
} from "react-icons/md";
import { Link, Link as LinkR } from "react-router-dom";
import Avatar from "../Images/avatar.png";
import { app } from "../firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setCartIsOpen, setIsMenuOpen, setUser } from "../reducers/userSlice";
import { Link as LinkS, animateScroll as scroll } from "react-scroll";
import { adminId } from "..";

const Header = () => {
  const {
    user,
    isMenuOpen,
    cart: { isOpen, cartItems },
  } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const userName = user?.displayName.split(" ").slice(0, 2).join(" ");
  const userDropdownRef = useRef();
  const cartItemCountRef = useRef();
  const cartIconContainerRef = useRef();
  const loginBtnRef = useRef();
  const [offset, setOffset] = useState(-82);
  const [loginBtnText, setLoginBtnText] = useState(true);

  const login = async () => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    // provider.addScope("")

    const {
      user: { providerData },
    } = await signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode);
      });
    // dispatch(setUser(providerData[0]));

    // // to persist state on refresh
    // localStorage.setItem("user", JSON.stringify(providerData[0]));
    // // to set cart icon to its original size
    // cartIconContainerRef.current.style.width = "fit-content";
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
    dispatch(setIsMenuOpen(false));
    localStorage.clear();
    dispatch(setUser(null));
    setTimeout(() => {
      changeHeaderAttrs();
    }, 1);
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
  }, [cartItems]);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="brand-logo">
          <LinkR
            to="/"
            className="logo-text"
            onClick={() => {
              toggleHome();
              user && closeMenu();
            }}
          >
            H<span className="small">un</span>G
            <span className="small">reed</span>
          </LinkR>
        </div>
        <ul className="navlinks-container" onClick={user && closeMenu}>
          <li className="navlinks">
            <LinkS
              to="home"
              activeClass="active"
              spy={true}
              smooth={true}
              offset={offset}
              duration={500}
              onClick={user && closeMenu}
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
              onClick={user && closeMenu}
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
              onClick={user && closeMenu}
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
              onClick={user && closeMenu}
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
              closeMenu();
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
                src={user.photoURL}
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
                {userName}
                <span>premium</span>
              </p>
              {/* administration id */}
              {user && user.email === adminId && (
                <LinkR
                  to="/createItem"
                  onClick={() => dispatch(setIsMenuOpen(false))}
                >
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
              <button className="logout-btn" onClick={logout}>
                Logout <MdOutlineLogout />
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
