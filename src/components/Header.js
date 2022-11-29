import React from "react";
import { HiShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";
import Avatar from "../Images/avatar.png";
import { app } from "../firebase.config";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user }, dispatch] = useStateValue();

  const login = async () => {
    const {
      user: { refreshToken, providerData },
    } = await signInWithPopup(firebaseAuth, provider);
    dispatch({
      type: actionType.SET_USER,
      user: providerData[0],
    });
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="brand-logo">
          <Link to="/" className="logo-text">
            H<span className="small">un</span>G
            <span className="small">reed</span>
          </Link>
        </div>
        <ul className="navlinks-container">
          <li className="navlinks">home</li>
          <li className="navlinks">menu</li>
          <li className="navlinks">about us</li>
          <li className="navlinks">services</li>
        </ul>
        <div className="cart">
          <HiShoppingBag />
          <div className="cart-itemCount">
            <p>2</p>
          </div>
        </div>
        <div className="user-profile">
          <img
            src={user ? user.photoURL : Avatar}
            alt="user-profile"
            onClick={login}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
