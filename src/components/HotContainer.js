import React from "react";
import { useRef, useState } from "react";
import {
  MdShoppingBasket,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";

const HotContainer = ({ foodItems }) => {
  const dishContainerRef = useRef();
  const dishCardRef = useRef();
  const [offsetVal, setOffsetVal] = useState(0);

  const getScrollOffset = () => {
    const value =
      parseInt(
        window.getComputedStyle(dishCardRef.current).getPropertyValue("width")
      ) +
      parseInt(
        window
          .getComputedStyle(dishContainerRef.current)
          .getPropertyValue("gap")
      );
    setOffsetVal(value);
  };

  const scrollDish = (scrollOffset) => {
    dishContainerRef.current.scrollLeft += scrollOffset;
  };

  return (
    <section className="hot-container">
      <div className="hot-header">
        <h2 className="hot-heading">Our fresh & healthy fruits</h2>
        <div className="slide-btn-container">
          <button className="slide-btn" onClick={() => scrollDish(-offsetVal)}>
            <MdKeyboardArrowLeft />
          </button>
          <button className="slide-btn" onClick={() => scrollDish(offsetVal)}>
            <MdKeyboardArrowRight />
          </button>
        </div>
      </div>
      <div className="hot-dishes" ref={dishContainerRef}>
        {foodItems &&
          foodItems.map((item) => {
            const { id, title, calories, imageURL, price } = item;
            return (
              <article
                className="dish-card"
                key={id}
                ref={dishCardRef}
                onLoad={getScrollOffset}
              >
                <div className="dish-primary">
                  <div className="dish-img">
                    <img src={imageURL} alt={title} />
                  </div>
                  <div className="add-to-cart">
                    <MdShoppingBasket />
                  </div>
                </div>
                <div className="dish-info">
                  <p className="dish-name">{title}</p>
                  <p className="dish-calories">{calories} calories</p>
                  <p className="dish-price">
                    <span>₹</span> {price}
                  </p>
                </div>
              </article>
            );
          })}
      </div>
    </section>
  );
};

export default HotContainer;
