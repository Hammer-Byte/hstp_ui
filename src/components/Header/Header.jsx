import { NavLink } from "react-router-dom";
import CustomButton from "../Buttons/CustomButton";
import "./header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">Name/logo</div>

        <div className="search-box">
          <img className="search-icon" src="/search.png" alt="Search Icon" />
          <input
            type="text"
            placeholder="Search learning"
          />
        </div>
      </div>

      <nav className="nav-links">
        <NavLink to="/categories">Explore Categories</NavLink>
        <NavLink to="/certifications">Certifications</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>

      <div className="header-right">
        <img className="cart-icon" src="/cart-img.png" alt="cart Icon" />

        <CustomButton variant="secondary">Sign-Up</CustomButton>
        <CustomButton variant="primary">Sign-In</CustomButton>
        <div className="language-translation">
          <img className="language-icon" src="/language-translation.png" alt="language Icon" />
        </div>
      </div>
    </header>
  );
}
