import { FaFilter, FaSearch, FaSlidersH } from "react-icons/fa";
import "../Styles/SingleSearchBar.css";

const SingleSearchBar = () => {
  return (
    <div className="new-bar">
      <div className="sub-bar">
        <div className="left-side">
          <FaSearch className="search" size={25} />
          <div className="content">
            <span>Where to?</span>
            <p>Anywhere . Any week . Add guest</p>
          </div>
        </div>
        <button>
          <FaSlidersH className="filter" size={55} />
        </button>
      </div>
    </div>
  );
};

export default SingleSearchBar;
