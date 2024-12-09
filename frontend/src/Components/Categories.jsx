import { useState, useRef, useEffect, useContext } from "react";
import "../Styles/Categories.css";
import { MdFilterList } from "react-icons/md";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AppContext } from "../Context/AppContext";

const Categories = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [isOn, setIsOn] = useState(false);
  const [showForwardArrow, setShowForwardArrow] = useState(true);
  const [showBackwardArrow, setShowBackwardArrow] = useState(false);
  const { data, setSelectedCategory } = useContext(AppContext);
  const iconsRef = useRef(null);

  // Toggle switch handler
  const handleToggle = () => {
    setIsOn(!isOn);
  };

  // Arrow visibility control
  const handleArrowVisibility = () => {
    if (!iconsRef.current) return;

    const scrollLeft = iconsRef.current.scrollLeft;
    const scrollWidth = iconsRef.current.scrollWidth;
    const clientWidth = iconsRef.current.clientWidth;

    setShowBackwardArrow(scrollLeft > 0);
    setShowForwardArrow(scrollLeft + clientWidth < scrollWidth);
  };

  // Scroll forward handler
  const scrollForward = () => {
    if (iconsRef.current) {
      iconsRef.current.scrollLeft += 200;
      handleArrowVisibility();
    }
  };

  // Scroll backward handler
  const scrollBackward = () => {
    if (iconsRef.current) {
      iconsRef.current.scrollLeft -= 200;
      handleArrowVisibility();
    }
  };

  // Handle icon selection
  const selectIcon = (index) => {
    setSelectedIcon(index);
  };

  useEffect(() => {
    handleArrowVisibility();
  }, [data]); // Run when data changes

  return (
    <div className="container sticky inset-16 sm:inset-14">
      <div className="hr"></div>
      <div className="sub-container">
        <div className="icons-wrapper">
          {showBackwardArrow && (
            <div className="arrows arrow-left" onClick={scrollBackward}>
              <FaChevronLeft />
            </div>
          )}
          <div
            className="icons"
            ref={iconsRef}
            onScroll={handleArrowVisibility}
          >
            {data && data.length > 0 ? (
              data.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedCategory(item);
                    selectIcon(item.id);
                  }}
                  className={`product ${
                    selectedIcon === item.id ? "selected" : ""
                  }`}
                >
                  <img src={item.url} alt={item.name} />
                  <span>{item.name}</span>
                </div>
              ))
            ) : (
              <p>No categories available</p>
            )}
          </div>
          {showForwardArrow && (
            <div className="arrows arrow-right" onClick={scrollForward}>
              <FaChevronRight />
            </div>
          )}
        </div>
        {/* <div className="buttons">
          <button className="first-btn">
            <MdFilterList /> <span>Filter</span>
          </button>
          <button className="second-btn" onClick={handleToggle}>
            <p>Display total before taxes</p>
            {isOn ? (
              <FaToggleOn className="toggle-icon" size={20} />
            ) : (
              <FaToggleOff className="toggle-icon off" size={20} />
            )}
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Categories;
