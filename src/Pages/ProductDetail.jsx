import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaShare } from "react-icons/fa";
import { AppContext } from "../Context/AppContext";
import "../Styles/ProductDetail.css";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // React Router's navigation hook
  const { properties, formatDate } = useContext(AppContext);

  const product = properties.find((item) => item._id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleBooking = () => {
    const gToken = localStorage.getItem("gToken");
    const hToken = localStorage.getItem("hToken");

    if (!gToken && !hToken) {
      // Redirect to login if no tokens are found
      toast.warn("Login to book a property");
      return navigate("/login");
    } else {
      // Redirect to booking page if tokens exist
      navigate(`/book/${product._id}`);
    }
  };

  return (
    <div className="product-detail px-4 sm:px-8 md:px-16">
      <div className="flex justify-between items-center py-6">
        <span className="text-3xl font-medium">{product.title}</span>
        <div className="flex items-center justify-between">
          <p className="flex items-center justify-between w-16 mx-6 text-sm sm:text-base">
            <FaShare />
            Share
          </p>
          <p className="flex items-center justify-between w-14 text-sm sm:text-base">
            <FaHeart />
            Save
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between border rounded-[10px] gap-2 mb-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full sm:w-[650px] sm:h-[50vh] h-auto rounded-md object-cover"
        />
        <div className="flex flex-col justify-center w-full sm:w-[600px] mx-6 pt-6 sm:pt-10 text-justify items-center sm:items-start">
          <p className="text-sm sm:text-base">{product.description}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between pb-10">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <span className="text-2xl font-medium">
            ${product.pricePerNight} per night
          </span>
          <p className="text-sm sm:text-base">
            {product.distance} kilometers away
          </p>
          <p className="text-sm sm:text-base">
            {formatDate(product.checkin, product.checkout)}
          </p>
          <p className="text-sm sm:text-base">{product.amenities}</p>
        </div>
        <button
          onClick={handleBooking}
          className="border bg-Button text-white px-6 py-3 rounded-xl text-sm sm:text-base"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
