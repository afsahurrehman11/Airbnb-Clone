import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { assets } from "../../assets/assets";
import { AppContext } from "../../Context/AppContext";

const AddProperty = () => {
  const { hToken } = useContext(AppContext);
  const [img, setImg] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Island");
  const [amenities, setAmenities] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [description, setDescription] = useState("");
  const [distance, setDistance] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!img) {
        return toast.error("Image not selected");
      }

      const formData = new FormData();
      formData.append("image", img);
      formData.append("title", title);
      formData.append("location", location);
      formData.append("pricePerNight", Number(price));
      formData.append("category", category);
      formData.append("amenities", amenities);
      formData.append("maxGuests", Number(maxGuests));
      formData.append("description", description);
      formData.append("distance", distance);
      formData.append("checkin", checkin);
      formData.append("checkout", checkout);

      // console log formdata
      // formData.forEach((value, key) => {
      //   console.log(`${key} : ${value}`);
      // });

      const { data } = await axios.post(
        "http://localhost:5000/api/host/add-property",
        formData,
        { headers: { hToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setImg(false);
        setTitle("");
        setLocation("");
        setAmenities("");
        setCategory("Island");
        setPrice("");
        setDescription("");
        setMaxGuests("");
        setDistance("");
        setCheckin("");
        setCheckout("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form className="m-5 w-[90%]" onSubmit={onSubmitHandler}>
      <p className="mb-3 text-lg font-medium text-center">Add Property</p>

      <div className="bg-white px-8 py-8 border  rounded w-full max-w-3xl mx-auto shadow-xl">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="img">
            <img
              src={img ? URL.createObjectURL(img) : assets.upload_area}
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
            />
          </label>
          <input
            onChange={(e) => setImg(e.target.files[0])}
            type="file"
            id="img"
            hidden
            className=""
          />
          <p>
            Property <br /> Picture
          </p>
        </div>

        <div className="flex flex-col gap-4 text-gray-600">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Property Title</p>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Enter property title"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Max Guests</p>
              <input
                onChange={(e) => setMaxGuests(e.target.value)}
                value={maxGuests}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Enter max guests"
                required
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Price Per Night</p>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Enter price"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Property Category</p>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="border rounded px-3 py-2"
              >
                <option value="Island">Island</option>
                <option value="Top Cities">Top Cities</option>
                <option value="Amazing Views">Amazing Views</option>
                <option value="Bed & Breakfast">Bed & Breakfast</option>
                <option value="Camping">Camping</option>
                <option value="Cabin">Cabin</option>
                <option value="Rooms">Rooms</option>
                <option value="Mansion">Mansion</option>
                <option value="Castles">Castles</option>
                <option value="OMG!">OMG!</option>
                <option value="Trendings">Trendings</option>
                <option value="Arctic">Arctic</option>
                <option value="New">New</option>
                <option value="Countryside">Countryside</option>
                <option value="Luxe">Luxe</option>
                <option value="Tropical">Tropical</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Property Location</p>
              <input
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Enter property location"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Amenities</p>
              <input
                onChange={(e) => setAmenities(e.target.value)}
                value={amenities}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Enter amenities"
                required
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Check In Date</p>
              <input
                onChange={(e) => setCheckin(e.target.value)}
                value={checkin}
                className="border rounded px-3 py-2"
                type="date"
                placeholder="Enter Check In Date"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Check Out Date</p>
              <input
                onChange={(e) => setCheckout(e.target.value)}
                value={checkout}
                className="border rounded px-3 py-2"
                type="date"
                placeholder="Enter Checkout Date"
                required
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Distance</p>
              <input
                onChange={(e) => setDistance(e.target.value)}
                value={distance}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Enter property distance"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              {/* <p>Date</p> */}
              <input
                // onChange={(e) => setDate(e.target.value)}
                // value={date}
                className="border rounded px-3 py-2 hidden"
                // type="text"
                // placeholder="Enter date"
                // required
              />
            </div>
          </div>
        </div>

        {/* Description Input at the End */}
        <div className="mt-4">
          <p className="mb-2">Property Description</p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full px-4 pt-2 border rounded"
            placeholder="Write about the property"
            rows={5}
            required
          />
        </div>

        <div className="text-center">
          <button className="bg-primary text-[#fff] px-10 py-3 mt-4 rounded-full ">
            Add Property
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddProperty;
