import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../../../admin/src/assets/assets";

const Bookings = () => {
  const { hToken } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);

  const getHostBookings = async () => {
    try {
      const { data } = await axios.get(
        // Replace with the correct API endpoint
        "http://localhost:5000/api/host/host-bookings",
        { headers: { hToken } }
      );
      if (data.success) {
        setBookings(data.bookedProperties.reverse());
        console.log(data.bookedProperties);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/host/cancel-booking",
        { bookingId },
        { headers: { hToken } }
      );
      if (data.success) {
        setBookings((prevBookings) =>
          prevBookings.map((item) =>
            item._id === bookingId ? { ...item, cancelled: true } : item
          )
        );
        toast.success("Booking cancelled successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeBooking = async (bookingId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/host/complete-booking",
        { bookingId },
        { headers: { hToken } }
      );
      if (data.success) {
        setBookings((prevBookings) =>
          prevBookings.map((item) =>
            item._id === bookingId ? { ...item, isCompleted: true } : item
          )
        );
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    if (hToken) {
      getHostBookings();
    }
  }, [hToken]);

  return (
    <div className="w-[90%] max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Bookings</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[60vh]">
        {/* Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Property</p>
          <p>Date & Time</p>
          <p>Total Price</p>
          <p>Action</p>
        </div>

        {/* Bookings List */}
        {bookings.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap items-center justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_3fr_1fr_1fr] text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
          >
            <p className="max-sm:hidden">{index + 1}</p>

            {/* Property Info */}
            <div className="flex items-center gap-2">
              <img
                className="w-14 h-8 rounded-full"
                src={item.propertyId.image}
                alt="Property"
              />
              <p>{item.propertyId.title}</p>
            </div>

            {/* Date and Time */}
            <p>
              {formatDate(item.checkin)} | {formatDate(item.checkout)}
            </p>

            {/* Total Fees */}
            <p>$ {item.totalPrice}</p>

            {/* Action (Cancelled/Completed/Cancel Icon) */}
            <div>
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : (
                <div className="flex">
                  <img
                    onClick={() => cancelBooking(item._id)}
                    src={assets.cancel_icon}
                    alt="Cancel"
                    className="w-10 cursor-pointer"
                  />
                  <img
                    onClick={() => completeBooking(item._id)}
                    src={assets.tick_icon}
                    alt="Complete"
                    className="w-10 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
