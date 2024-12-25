import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [properties, setProperties] = useState([]);
  const [dashData, setDashData] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [bookings, setBookings] = useState([]);

  const getAllProperties = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-properties",
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        setProperties(data.propertyList);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const changeAvailability = async (propertyId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { propertyId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllProperties();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const deleteProperty = async (propertyId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/delete-property",
        { propertyId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllProperties();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getAllBookings = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/all-bookings", {
        headers: { aToken },
      });
      if (data.success) {
        setBookings(data.bookings.reverse());
        console.log(data.bookings);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-booking",
        { bookingId },
        {
          headers: { aToken },
        }
      );
      if (data.success) {
        // Update the bookings state to reflect the cancellation
        setBookings((prevBookings) =>
          prevBookings.map((item) =>
            item._id === bookingId ? { ...item, cancelled: true } : item
          )
        );
        toast.success("Booking cancelled successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const completeBooking = async (bookingId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/complete-booking",
        { bookingId },
        {
          headers: { aToken },
        }
      );
      if (data.success) {
        setBookings((prevBookings) =>
          prevBookings.map((item) =>
            item._id === bookingId ? { ...item, isCompleted: true } : item
          )
        );
        toast.success("Booking Completed");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { aToken },
      });
      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    properties,
    setProperties,
    getAllProperties,
    changeAvailability,
    deleteProperty,
    bookings,
    setBookings,
    getAllBookings,
    cancelBooking,
    dashData,
    setDashData,
    getDashData,
    completeBooking,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
