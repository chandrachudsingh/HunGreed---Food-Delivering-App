import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateContainer from "./components/CreateContainer";
import { useDispatch, useSelector } from "react-redux";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { useEffect } from "react";
import { setFoodItems } from "./reducers/userSlice";

function App() {
  const { user, foodItems } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch(setFoodItems(data));
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} exact />
        {user && (
          <Route path="/createItem" element={<CreateContainer />} exact />
        )}
      </Routes>
    </main>
  );
}

export default App;
