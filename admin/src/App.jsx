import { useContext } from "react";
import Login from "./Pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./Context/AdminContext";
import Navbar from "./Components/Navbar";
import SideBar from "./Components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Admin/Dashboard";
import AllBookings from "./Pages/Admin/AllBookings";
import PropertyList from "./Pages/Admin/PropertyList";
import AddProperty from "./Pages/Admin/AddProperty";

const App = () => {
  const { aToken } = useContext(AdminContext);
  return aToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <SideBar />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-bookings" element={<AllBookings />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/property-list" element={<PropertyList />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
