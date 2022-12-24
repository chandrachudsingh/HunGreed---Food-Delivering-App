import React from "react";
import HotContainer from "./HotContainer";
import MenuContainer from "./MenuContainer";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useCallback } from "react";

const MenuSection = () => {
  const { foodItems } = useSelector((state) => state.userData);
  const [itemList, setItemList] = useState([]);
  const [offsetVal, setOffsetVal] = useState(0);

  const dishContainerRef = useRef();
  const dishCardRef = useRef();

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

  const filterItems = useCallback(
    (urlParamName) => {
      setItemList(foodItems.filter((item) => item.category === urlParamName));
    },
    [foodItems]
  );

  const setAdd2CartBtnHover = () => {
    var elements = document.querySelectorAll(".add2cart-btn");
    if (window.innerWidth > 480) {
      if (!elements[0].classList.contains("hover")) {
        elements.forEach((element) => {
          element.classList.add("hover");
        });
      }
    } else {
      if (elements[0].classList.contains("hover")) {
        elements.forEach((element) => {
          element.classList.remove("hover");
        });
      }
    }
  };

  return (
    <section className="menu-section" id="menu">
      <section className="hot-container">
        <div className="hot-header container-header">
          <h2 className="hot-heading container-heading">
            Our fresh & healthy fruits
          </h2>
          <div className="slide-btn-container">
            <button
              className="slide-btn"
              onClick={() => scrollDish(-offsetVal)}
            >
              <MdKeyboardArrowLeft />
            </button>
            <button className="slide-btn" onClick={() => scrollDish(offsetVal)}>
              <MdKeyboardArrowRight />
            </button>
          </div>
        </div>
        {foodItems ? (
          <HotContainer
            foodItems={foodItems.filter(
              (item) => item.category === "icecreams"
            )}
            dishContainerRef={dishContainerRef}
            dishCardRef={dishCardRef}
            getScrollOffset={getScrollOffset}
          />
        ) : (
          <Loading />
        )}
      </section>
      <section className="menu-container">
        <div className="menu-header container-header">
          <h2 className="menu-heading container-heading">Our Menu</h2>
        </div>
        {foodItems ? (
          <MenuContainer
            itemList={itemList}
            filterItems={filterItems}
            setAdd2CartBtnHover={setAdd2CartBtnHover}
          />
        ) : (
          <Loading />
        )}
      </section>
    </section>
  );
};

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
    </div>
  );
};

export default MenuSection;
