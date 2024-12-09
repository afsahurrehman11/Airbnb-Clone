import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import categories from "../categories";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [data, setData] = useState(categories);
  const [selectedCategory, setSelectedCategory] = useState(
    categories.find((category) => category.name === "Top Cities")
  );
  const [hostData, setHostData] = useState([]);

  const [hToken, setHToken] = useState(
    localStorage.getItem("hToken") ? localStorage.getItem("hToken") : ""
  );
  const [gToken, setGToken] = useState(
    localStorage.getItem("gToken") ? localStorage.getItem("gToken") : ""
  );
  const [properties, setProperties] = useState([]);

  const formatDateRange = (checkin, checkout) => {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);

    if (isNaN(checkinDate) || isNaN(checkoutDate)) {
      return "Invalid dates";
    }

    const options = { month: "short", day: "numeric" };
    const checkinFormatted = checkinDate.toLocaleDateString("en-US", options);
    const checkoutFormatted = checkoutDate.toLocaleDateString("en-US", options);

    return `${checkinFormatted} - ${checkoutFormatted}`;
  };

  const calculateDaysBetweenDates = (checkin, checkout) => {
    const start = new Date(checkin);
    const end = new Date(checkout);
    if (isNaN(start) || isNaN(end)) {
      throw new Error("Invalid dates");
    }
    if (start > end) {
      throw new Error("Start date must be before end date");
    }
    const differenceInTime = end - start;
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays;
  };

  const calculateTotalPrice = (checkin, checkout, pricePerNight) => {
    const start = new Date(checkin);
    const end = new Date(checkout);
    if (isNaN(start) || isNaN(end)) {
      throw new Error("Invalid dates");
    }
    if (start > end) {
      throw new Error("Start date must be before end date");
    }
    const differenceInTime = end - start;
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    const totalPrice = differenceInDays * pricePerNight;
    return totalPrice;
  };

  const getPropertiesData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/property/list"
      );
      if (data.success) {
        setProperties(data.properties);

        console.log(data.properties);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(data.message);
    }
  };

  const getHostData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/host/property-list",
        { headers: { hToken } }
      );
      if (data.success) {
        setHostData(data.propertyList);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(data.message);
    }
  };

  const changeAvailability = async (propertyId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/host/change-availability",
        { propertyId },
        { headers: { hToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getHostData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(data.message);
    }
  };

  const deleteProperty = async (propertyId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/host/delete-property",
        { propertyId },
        { headers: { hToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getHostData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(data.message);
    }
  };

  useEffect(() => {
    getPropertiesData();
  }, []);

  const value = {
    data,
    selectedCategory,
    setSelectedCategory,
    properties,
    setProperties,
    getPropertiesData,
    formatDate: formatDateRange,
    hToken,
    setHToken,
    gToken,
    setGToken,
    hostData,
    setHostData,
    getHostData,
    changeAvailability,
    deleteProperty,
    calculateDaysBetweenDates,
    calculateTotalPrice,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
