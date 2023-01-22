import React from "react";
import Header from "./Header";
import CartContainer from "./CartContainer";
import HeroSection from "./HeroSection";
import About from "./About";
import MenuSection from "./MenuSection";
import ServicesSection from "./ServicesSection";

const Home = () => {
  return (
    <>
      <Header />
      <CartContainer />
      <HeroSection />
      <MenuSection />
      <About />
      <ServicesSection />
    </>
  );
};

export default Home;
