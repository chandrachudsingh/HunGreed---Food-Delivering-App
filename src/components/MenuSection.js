import React from "react";
import HotContainer from "./HotContainer";
import MenuContainer from "./MenuContainer";
import { useSelector } from "react-redux";

const MenuSection = () => {
  const { foodItems } = useSelector((state) => state.userData);
  return (
    <section className="menu-section" id="menu">
      <HotContainer
        foodItems={foodItems?.filter((item) => item.category === "icecreams")}
      />
      <MenuContainer foodItems={foodItems} />
    </section>
  );
};

export default MenuSection;
