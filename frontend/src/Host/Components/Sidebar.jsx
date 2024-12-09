import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { assets } from "../../assets/assets.js";
import { AppContext } from "../../Context/AppContext";

const SideBar = () => {
  const { hToken } = useContext(AppContext);
  return (
    <div className="min-h-screen bg-white border-r">
      {hToken && (
        <ul className="text-[#515151 mt-5]">
          <NavLink
            to={"/bookings"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary " : ""
              }`
            }
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">Bookings</p>
          </NavLink>

          <NavLink
            to={"/all-bookings"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary " : ""
              }`
            }
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">All Properties</p>
          </NavLink>

          <NavLink
            to={"/add-property"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary " : ""
              }`
            }
          >
            <img src={assets.add_icon} alt="" />
            <p className="hidden md:block">Add Property</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default SideBar;
