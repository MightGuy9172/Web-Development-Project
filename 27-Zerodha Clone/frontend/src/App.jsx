import HomePage from "./components/landing_page/home/HomePage";
import SignUp from "./components/landing_page/signup/SignUp";
import ProductPage from "./components/landing_page/products/ProductPage";
import PricingPage from "./components/landing_page/pricing/PricingPage";
import SupportPage from "./components/landing_page/support/SupportPage";
import AboutPage from "./components/landing_page/about/AboutPage";
import NotFound from "./components/landing_page/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/landing_page/Navbar";
import Footer from "./components/landing_page/Footer";
import Login from "./components/landing_page/Login";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
