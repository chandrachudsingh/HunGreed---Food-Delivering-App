import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import CreatePage from "./components/CreatePage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFoodItems, getCartItems } from "./utils/firebaseFunctions";
import { setCartItems, setFoodItems } from "./reducers/userSlice";
import { adminId } from ".";

function App() {
  const {
    user,
    cart: { isOpen },
  } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch(setFoodItems(data));
    });
  };

  const fetchCartItems = async (uid) => {
    await getCartItems(uid).then((data) => {
      dispatch(setCartItems(data));
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchCartItems(user?.uid);
  }, [user]);

  // disabling body scroll if cart is open
  useEffect(() => {
    const body = document.querySelector("body");
    if (isOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/signin" element={<SignIn />} exact />
          {user && user.email === adminId && (
            <Route path="/createItem" element={<CreatePage />} exact />
          )}
        </Routes>
      </Router>
    </main>
  );
}

export default App;
