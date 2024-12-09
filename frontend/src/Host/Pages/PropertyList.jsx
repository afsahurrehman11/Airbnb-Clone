import { useContext, useEffect } from "react";

import { AppContext } from "../../Context/AppContext";
import { MdDelete } from "react-icons/md";

const PropertyList = () => {
  const {
    hToken,
    hostData,
    setHostData,
    changeAvailability,
    getHostData,
    deleteProperty,
  } = useContext(AppContext);

  useEffect(() => {
    if (hToken) {
      getHostData();
    }
  }, [hToken]);

  return (
    <div className="m-5">
      <h1 className="text-lg font-medium">All Properties</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {hostData.map((item, index) => (
          <div
            key={index}
            className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group relative"
          >
            <img
              src={item.image}
              alt=""
              className="bg-indigo-50 transition-all duration-500 h-[200px] w-[250px]"
            />
            <div className="p-4">
              <p className="text-neutral-800 text-sm font-medium">
                {item.title}
              </p>
              <p className="text-zinc-600 text-sm">{item.location}</p>

              <div className="flex justify-between items-center">
                <label htmlFor={`availability-${item._id}`}>
                  <input
                    id={`availability-${item._id}`}
                    name={`availability-${item._id}`}
                    type="checkbox"
                    checked={item.availability}
                    onChange={() => changeAvailability(item._id)}
                  />
                  <span className="ml-2">
                    {item.availability ? "Available" : "Unavailable"}
                  </span>
                </label>
                <button
                  className="text-xs px-2 py-1 rounded-full text-red-600 border me-1  border-red-600 "
                  onClick={() => deleteProperty(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
