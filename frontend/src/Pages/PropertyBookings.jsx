import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const PropertyBookings = () => {
  const { gToken } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);

  // Get all bookings for the user
  const getUserBookings = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/bookings",
        {},
        { headers: { Authorization: `Bearer ${gToken}` } }
      );
      if (data.success) {
        setBookings(data.bookings.reverse());
        console.log(data.bookings);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  // Cancel booking API call
  const cancelBooking = async (bookingId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/cancel-bookings", // Corrected URL
        { bookingId },
        {
          headers: { Authorization: `Bearer ${gToken}` },
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
      toast.error(
        error.response?.data?.message || "Failed to cancel the booking."
      );
    }
  };

  // Format date to only show the date (without time)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    if (gToken) {
      getUserBookings();
    }
  }, [gToken]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <p className=" text-3xl font-bold pb-3 mt-12  text-gray-800 border-b-2">
        <center>My Bookings</center>
      </p>

      <div className="space-y-6 mt-6">
        {bookings.slice(0, 4).map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr] gap-6 sm:flex sm:gap-6 py-4 px-6 items-center  bg-gray-50 border border-gray-200 rounded-lg shadow-sm transition-transform duration-300 "
            key={index}
          >
            <div className="w-full max-w-xs h-48 bg-indigo-50 overflow-hidden rounded-lg sm:min-w-72 ">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={item.propertyId.image}
                alt="Property"
              />
            </div>
            <div className="flex flex-col text-sm text-gray-700 space-y-2">
              <p className="text-xl font-semibold text-gray-900">
                {item.propertyId.location}
              </p>
              <p className="text-xl font-semibold text-gray-900">
                Total Price : {item.totalPrice} $
              </p>
              <p className="text-sm font-medium text-gray-600">
                <span className="text-sm font-medium text-neutral-700">
                  Date:{" "}
                </span>
                {formatDate(item.checkin)} | {formatDate(item.checkout)}
              </p>
              {/* Cancel button logic */}
              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelBooking(item._id)}
                  className="text-sm text-stone-500 text-center py-2 px-4 border border-red-500 rounded-md hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel Booking
                </button>
              )}
              {item.cancelled && !item.isCompleted && (
                <p className="text-sm text-center py-2 px-4 border border-red-500 rounded-md text-red-500 w-52">
                  Cancelled
                </p>
              )}
              {/* Mark as completed button */}
              {item.isCompleted && (
                <button className="text-sm py-2 px-4 border border-green-500 rounded-md text-green-500 bg-green-50 hover:bg-green-100 transition-all duration-300">
                  Completed
                </button>
              )}
            </div>
            <div className="flex flex-col justify-center gap-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyBookings;
