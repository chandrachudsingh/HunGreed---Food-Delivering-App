import { useEffect } from "react";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import CreatePage from "./components/CreatePage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserData,
  getAllFoodItems,
  getCartItems,
} from "./utils/firebaseFunctions";
import { setCartItems, setFoodItems, setUserInfo } from "./reducers/userSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "./firebase.config";

function App() {
  const {
    userInfo,
    cart: { isOpen },
  } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, loading] = useAuthState(firebaseAuth);

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

  const fetchUserDetails = async (user) => {
    const data = await fetchUserData(user);
    dispatch(setUserInfo(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchCartItems(userInfo?.uid);
  }, [userInfo]);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserDetails(user);
  }, [user, loading]);

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
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        {/* admin only */}
        {user && userInfo?.accountType === "admin" && (
          <Route path="/createItem" element={<CreatePage />} exact />
        )}
      </Routes>
    </main>
  );
}

export default App;
