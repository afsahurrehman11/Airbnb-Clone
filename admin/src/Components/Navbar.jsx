import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../Context/AdminContext";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
  };

  return (
    <div className=" flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img src={logo} alt="" className="w-36 sm:w-40 cursor-pointer" />
        <p className=" border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 ">
          Admin
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-primary text-[#fff] text-sm px-10 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
