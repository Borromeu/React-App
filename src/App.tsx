import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import "./css/App.css";
import { MovieProvider } from "./context/MovieContext";

function App() {
  return (
    <>
      <div>
        <Navbar></Navbar>
      </div>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/favorites" element={<Favorites></Favorites>}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
