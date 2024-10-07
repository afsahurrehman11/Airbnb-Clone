import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/src/assets/sample.png" alt="Logo" />
      </div>
      <nav className="nav">
        <a href="#">Stays</a>
        <a href="#">Experiences</a>
        <a href="#">Online Experiences</a>
      </nav>
      <div className="search-bar">
        <input type="text" placeholder="Where" />
        <input type="text" placeholder="Check in" />
        <input type="text" placeholder="Check out" />
        <input type="text" placeholder="Who" />
        <button className="search-btn">Search</button>
      </div>
      <div className="profile">
        <img src="/src/assets/sample.png" alt="Profile" />
      </div>
    </header>
  );
};

export default Header;
