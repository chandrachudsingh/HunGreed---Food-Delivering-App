import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateContainer from "./components/CreateContainer";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.userData);
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
