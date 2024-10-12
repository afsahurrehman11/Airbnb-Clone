import { Route, Routes } from "react-router-dom";
import SideBar from "./Components/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  return (
    <div>
      <div className="bg-[#F8F9FD]">
        <ToastContainer />

        <div className="flex items-start">
          <SideBar />
          <Routes>
            <Route path="/bookings" element={<></>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
