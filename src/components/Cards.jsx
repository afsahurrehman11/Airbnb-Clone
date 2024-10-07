import { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "../Styles/Cards.css";
import { AppContext } from "../Context/AppContext.jsx";
import { Link } from "react-router-dom";

const Cards = ({ searchQuery }) => {
  const { selectedCategory, properties, formatDate } = useContext(AppContext);
  const [filterProperties, setFilterProperties] = useState([]);

  // Handle loading state if `selectedCategory` is not yet available
  if (!selectedCategory) {
    return <div>Loading...</div>;
  }

  // Filter properties based on the selected category and search query
  useEffect(() => {
    const filtered = properties
      .filter((property) => property.category === selectedCategory.name)
      .filter((property) =>
        property.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    setFilterProperties(filtered);
  }, [searchQuery, properties, selectedCategory]);

  return (
    <div className="cards">
      {filterProperties.length > 0 ? (
        filterProperties.map((property) => (
          <Link
            to={`/product/${property._id}`}
            key={property._id}
            className="inner-card"
          >
            <img src={property.image} alt={property.title} />
            <div className="top">
              <h2>{property.location}</h2>
              <p className="rating">
                <FaStar size={13} style={{ marginRight: "4px" }} />
                {property.rating || "No rating"}
              </p>
            </div>
            <p className="property">{property.distance} kilometers away</p>
            <p>{formatDate(property.checkin, property.checkout)}</p>
            <p className="price">${property.pricePerNight} per night</p>
          </Link>
        ))
      ) : (
        <div className="col-span-full text-center text-white">
          No Property found.
        </div>
      )}
    </div>
  );
};

export default Cards;
