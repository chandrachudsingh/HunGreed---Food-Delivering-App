import React from "react";
import HotSection from "./HotSection";
import AllMenuSection from "./AllMenuSection";
import { useSelector } from "react-redux";

const MenuSection = () => {
  const { foodItems } = useSelector((state) => state.userData);
  return (
    <section className="menu-section" id="menu">
      <HotSection
        foodItems={foodItems?.filter((item) => item.category === "icecreams")}
      />
      <AllMenuSection foodItems={foodItems} />
    </section>
  );
};

export default MenuSection;
