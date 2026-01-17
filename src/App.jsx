import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ExploreCategories from "./pages/Categories/Categories";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/Footer/Footer";

export default function App() {

  return (
      <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route path="/" element={<div>Home</div>} /> */}
        <Route path="/" element={<div><ExploreCategories /></div>} />
        <Route path="/certifications" element={<div>Certifications</div>} />
        <Route path="/about" element={<div>About</div>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}