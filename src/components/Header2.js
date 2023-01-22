import React, { useEffect, useRef } from "react";
import { MdShoppingBasket, MdOutlineLogout } from "react-icons/md";
import { Link as LinkR } from "react-router-dom";
import Avatar from "../Images/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { setCartIsOpen, setIsMenuOpen, setUser } from "../reducers/userSlice";

const Header = () => {
  const {
    user,
    isMenuOpen,
    cart: { isOpen, cartItems },
  } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const userDropdownRef = useRef();
  const cartItemCountRef = useRef();
  const userName = user.displayName.split(" ").slice(0, 2).join(" ");

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
    window.location.href = "/";
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

  const setAltUserImg = (e) => {
    e.target.src = Avatar;
  };

  useEffect(() => {
    if (cartItemCountRef.current) {
      totalQty();
    }
  }, [cartItems]);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="brand-logo">
          <LinkR to="/" className="logo-text" onClick={closeMenu}>
            H<span className="small">un</span>G
            <span className="small">reed</span>
          </LinkR>
        </div>
        <div className="cartIcon-container2">
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
            <button className="logout-btn" onClick={logout}>
              Logout <MdOutlineLogout />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
