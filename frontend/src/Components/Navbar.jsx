// import { useState, useEffect, useRef } from "react";
// import logo from "../assets/logo.png";
// import subLogo from "../assets/subLogo.png";
// import "../Styles/Navbar.css";
// import { FaGlobe, FaBars, FaUser } from "react-icons/fa";
// import SmallSearchBar from "./SmallSearchBar";

// const Navbar = () => {
//   const [hover, setHover] = useState(false);
//   const [isLinksVisible, setIsLinksVisible] = useState(true);
//   const menuRef = useRef(null);

//   const toggleHover = () => {
//     setHover((prevHover) => !prevHover);
//   };

//   const handleClickOutside = (event) => {
//     if (menuRef.current && !menuRef.current.contains(event.target)) {
//       setHover(false);
//     }
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 1) {
//         setIsLinksVisible(false);
//       } else {
//         setIsLinksVisible(true);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <nav>
//       <div className="logo">
//         <img src={logo} alt="logo" />
//       </div>
//       <div className="subLogo">
//         <img src={subLogo} alt="" />
//       </div>
//       {isLinksVisible && (
//         <div className="links">
//           <ul>
//             <li>
//               <a href="#">Stays</a>
//             </li>
//             <li>
//               <a href="#">Experience</a>
//             </li>
//           </ul>
//         </div>
//       )}

//       {!isLinksVisible && <SmallSearchBar />}

//       <div className="user" ref={menuRef}>
//         <p className="para">Airbnb your home</p>
//         <span className="glob">
//           <FaGlobe size={16} />
//         </span>
//         <div className="menu" onClick={toggleHover}>
//           <FaBars />
//           <FaUser className="user-icon" size={30} color="white" />
//         </div>
//         {hover && (
//           <div className="hover">
//             <p>Sign Up</p>
//             <p>Login</p>
//             <hr />
//             <p>Gift Cards</p>
//             <p>Airbnb your home</p>
//             <p>Host an experience</p>
//             <p>Help Center</p>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
