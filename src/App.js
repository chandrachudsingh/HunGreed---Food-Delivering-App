import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
// import CreateItem from "./components/CreateItemSection";

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} exact />
        {/* <Route path="/createItem" element={<CreateItem />} exact /> */}
      </Routes>
    </main>
  );
}

export default App;
