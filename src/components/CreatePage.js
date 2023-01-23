import React from "react";
import CartContainer from "./CartContainer";
import Header from "./Header2";
import CreateContainer from "./CreateContainer";

const CreatePage = () => {
  return (
    <>
      <div id="cart-overlay"></div>
      <Header />
      <CartContainer />
      <CreateContainer />
    </>
  );
};

export default CreatePage;
