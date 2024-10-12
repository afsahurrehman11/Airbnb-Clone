import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const BookingPage = () => {
  const { id } = useParams();
  const { properties, gToken, hToken } = useContext(AppContext);
  const navigate = useNavigate();

  const product = properties.find((item) => item._id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkInError, setCheckInError] = useState("");
  const [checkOutError, setCheckOutError] = useState("");
  const [message, setMessage] = useState(""); // For success/error messages

  const calculateDaysBetweenDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start) || isNaN(end) || start >= end) return 0;
    return Math.ceil((end - start) / (1000 * 3600 * 24));
  };

  const calculateTotalPrice = () => {
    const days = calculateDaysBetweenDates(checkInDate, checkOutDate);
    if (days > 0 && guestCount > 0) {
      const total = days * guestCount * product.pricePerNight;
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [checkInDate, checkOutDate, guestCount]);

  const validateDates = () => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);

      if (checkIn >= checkOut) {
        setCheckInError("Check-in date must be earlier than check-out date.");
        setCheckOutError("Check-out date must be later than check-in date.");
        return false;
      } else {
        setCheckInError("");
        setCheckOutError("");
        return true;
      }
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateDates()) {
      return;
    }

    const payload = {
      propertyId: product._id,
      checkin: checkInDate,
      checkout: checkOutDate,
      guest: Number(guestCount),
      totalPrice: Number(totalPrice),
    };

    console.log("Payload being sent:", payload);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/book-property",
        payload,
        {
          headers: {
            Authorization: `Bearer ${gToken}`, // Pass token in the correct format
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/book/all-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="booking-page px-8 py-16 ">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Book Your Stay at {product.title}
        </h2>

        <div className="product-summary flex mb-8">
          <img
            src={product.image}
            alt={product.title}
            className="w-48 h-32 object-cover rounded-md mr-6"
          />
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-medium text-gray-800">
              {product.title}
            </h3>
            <p className="text-gray-600">{product.subMainTitle}</p>
            <p className="text-lg font-bold text-Button">
              ${product.pricePerNight} per night
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="opacity-0">
            {/* <p>{product.id}</p>
            <p>{gToken}</p>
            <p>{hToken}</p> */}
          </div>
          <div className="form-group mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Check-in Date
            </label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => {
                setCheckInDate(e.target.value);
                validateDates();
              }}
              className={`w-full p-3 border ${
                checkInError ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
            />
            {checkInError && (
              <p className="text-red-500 text-sm mt-1">{checkInError}</p>
            )}
          </div>

          <div className="form-group mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Check-out Date
            </label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => {
                setCheckOutDate(e.target.value);
                validateDates();
              }}
              className={`w-full p-3 border ${
                checkOutError ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
            />
            {checkOutError && (
              <p className="text-red-500 text-sm mt-1">{checkOutError}</p>
            )}
          </div>

          <div className="form-group mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Number of Guests
            </label>
            <input
              type="number"
              value={guestCount}
              min="1"
              onChange={(e) => setGuestCount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="mb-6">
            <span className="text-gray-700 font-medium">Total Price:</span>{" "}
            <span className="text-lg font-bold text-Button">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          {message && (
            <div className="text-center mb-4 text-green-600">{message}</div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-Button text-white font-semibold rounded-md  transition"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
