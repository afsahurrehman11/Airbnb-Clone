import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="category-nav">
      <ul>
        <li><a href="#">Icons</a></li>
        <li><a href="#">Rooms</a></li>
        <li><a href="#">Top cities</a></li>
        <li><a href="#">Trending</a></li>
        <li><a href="#">Windmills</a></li>
        <li><a href="#">Amazing views</a></li>
        <li><a href="#">Design</a></li>
        <li><a href="#">Countryside</a></li>
        <li><a href="#">Mansions</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
