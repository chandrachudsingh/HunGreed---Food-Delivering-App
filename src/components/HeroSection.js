import React, { useEffect, useState } from "react";
import { heroData } from "../utils/data";
import Delivery from "../Images/delivery.png";
import heroBg from "../Images/heroBg.png";
import { Button } from "react-scroll";
import { setIsMenuOpen } from "../reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../firebase.config";

const HeroSection = () => {
  const { isMenuOpen } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const [user] = useAuthState(firebaseAuth);
  const [offset, setOffset] = useState(-82);

  function getNavHeight() {
    const nav = document.querySelector(".navbar");
    const navHeight = parseFloat(getComputedStyle(nav).height);
    setOffset(-navHeight);
  }

  const closeMenu = () => {
    const userDropdown = document.querySelector(".user-dropdown-menu");
    userDropdown.classList.remove("openMenu");

    const transitionDuration =
      parseFloat(
        window
          .getComputedStyle(userDropdown)
          .getPropertyValue("transition-duration")
      ) * 1000;
    setTimeout(() => {
      userDropdown.style.display = "none"; //for closing animation

      dispatch(setIsMenuOpen(false));
    }, transitionDuration);
  };

  useEffect(() => {
    window.addEventListener("resize", getNavHeight);
    getNavHeight();
  }, []);

  return (
    <section
      className="hero-section"
      id="home"
      onClick={() => {
        if (user && isMenuOpen) {
          closeMenu();
        }
      }}
    >
      <div className="hero-content">
        <div className="delivery">
          <p>bike delivery</p>
          <div className="bike-icon">
            <img src={Delivery} alt="delivery" />
          </div>
        </div>
        <p className="tagline">
          Not Zip-Zap, We Work at <span>Zoom Speed</span>
        </p>
        <p className="description">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non eius
          iure eaque repudiandae asperiores ullam nemo maxime. Laudantium sed
          tempore optio blanditiis, odio, error a fugit nihil enim laboriosam
          iure.
        </p>
        <Button
          type="submit"
          activeClass="active"
          to="menu"
          spy={true}
          smooth={true}
          offset={offset}
          duration={500}
          className="hero-order-btn"
          value="Order Now"
        ></Button>
      </div>
      <div className="hero-attractions">
        <img src={heroBg} alt="hero-bg" className="hero-bg" />
        <div className="hero-delicacies">
          {heroData &&
            heroData.map((item) => {
              const { id, name, desc, price, imageSrc } = item;
              return (
                <article className="hero-card" key={id}>
                  <div className="hero-img">
                    <img src={imageSrc} alt="" />
                  </div>
                  <div className="item-info">
                    <h4 className="item-name">{name}</h4>
                    <p className="item-desc">{desc}</p>
                    <p className="item-price">
                      <span>₹</span> {price}
                    </p>
                  </div>
                </article>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
