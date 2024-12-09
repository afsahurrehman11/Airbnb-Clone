import { useContext, useState } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { BiHeart } from "react-icons/bi";
import "../Styles/LowerNavabr.css";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";

const LowerNavbar = () => {
  const [selectedIcon, setSelectedIcon] = useState("explore");
  const { gToken, setGToken, hToken, setHToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSelect = (iconName) => {
    setSelectedIcon(iconName);
  };

  const logout = () => {
    navigate("/");
    toast.success("You are logged out");
    gToken && setGToken("");
    gToken && localStorage.removeItem("gToken");
    hToken && setHToken("");
    hToken && localStorage.removeItem("hToken");
  };

  return (
    <div className="lower-navbar">
      <div className="sub-lower-navbar">
        <div
          className="icon"
          onClick={() => handleSelect("explore")}
          style={{
            color: selectedIcon === "explore" ? "#ff385c" : "black",
          }}
        >
          <Link to="/">
            <FaSearch size={20} />
            <p>Explore</p>
          </Link>
        </div>

        {gToken && (
          <div
            className="icon"
            onClick={() => handleSelect("wishlist")}
            style={{
              color: selectedIcon === "wishlist" ? "#ff385c" : "black",
            }}
          >
            <Link to="/book/all-bookings">
              <BiHeart size={20} />
              <p>My Bookings</p>
            </Link>
          </div>
        )}

        <div
          className="icon"
          onClick={() => handleSelect("login")}
          style={{
            color: selectedIcon === "login" ? "#ff385c" : "black",
          }}
        >
          {gToken || hToken ? (
            <div onClick={logout}>
              <FaUser size={20} />
              <p>Logout</p>
            </div>
          ) : (
            <Link to="/login">
              <FaUser size={20} />
              <p>Login in</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LowerNavbar;
