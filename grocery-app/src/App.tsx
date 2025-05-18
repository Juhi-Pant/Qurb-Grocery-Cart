import './App.css';
import { BrowserRouter as  Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import NavBar from './components/NavBar';
import OfferCarousel from './components/OfferCarousel';
import offers from './hooks/useOffers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <OfferCarousel offers={offers} />

      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
