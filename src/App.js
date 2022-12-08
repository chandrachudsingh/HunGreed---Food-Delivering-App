import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateContainer from "./components/CreateContainer";
import { useStateValue } from "./context/StateProvider";

function App() {
  const [{ user }] = useStateValue();
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
