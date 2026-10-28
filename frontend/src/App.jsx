import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./pages/NavBar.jsx";
import Home from "./pages/Home.jsx";
import AddOrder from "./pages/AddOrder.jsx";
import DisplayOrders from "./pages/DisplayOrders.jsx";
import "./style.css";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="page-content" id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddOrder />} />
          <Route path="/display" element={<DisplayOrders />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
