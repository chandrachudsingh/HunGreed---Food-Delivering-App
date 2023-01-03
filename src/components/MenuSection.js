import React from "react";
import HotContainer from "./HotContainer";
import MenuContainer from "./MenuContainer";
import { useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { getCartItems, saveCartItem } from "../utils/firebaseFunctions";
import { setCartItems } from "../reducers/userSlice";
import ItemAddedModal from "./ItemAddedModal";
import Loading from "./Loading";

const MenuSection = () => {
  const { foodItems } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const modalDuration = 3000;
  const [itemList, setItemList] = useState([]);
  const [offsetVal, setOffsetVal] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
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

  const fetchCartItems = async () => {
    await getCartItems().then((data) => {
      dispatch(setCartItems(data));

      setAddingToCart(false);
      setShowSuccessModal(true);
      const transitionDuration = 200;
      setTimeout(() => {
        setShowSuccessModal(false);
      }, modalDuration + transitionDuration);
    });
  };

  const addToCart = async (item) => {
    setAddingToCart(true);
    await saveCartItem(item);
    fetchCartItems();
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
            addToCart={addToCart}
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
            addToCart={addToCart}
          />
        ) : (
          <Loading />
        )}
      </section>
      {addingToCart && (
        <div id="add2cart-overlay">
          <div className="loader"></div>
        </div>
      )}
      {showSuccessModal && <ItemAddedModal modalDuration={modalDuration} />}
    </section>
  );
};

export default MenuSection;
