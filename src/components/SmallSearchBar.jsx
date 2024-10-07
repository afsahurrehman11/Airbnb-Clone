import { FaSearch } from "react-icons/fa";

import "../Styles/Navbar.css";

const SmallSearchBar = () => {
  return (
    <div className="small">
      <button>Anywhere</button>
      <button>Any week</button>
      <button id="sub-btn">
        Add guest <FaSearch size={35} id="Icon" color="white" />
      </button>
    </div>
  );
};

export default SmallSearchBar;
