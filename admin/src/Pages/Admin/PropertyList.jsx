import { useContext, useEffect } from "react";
import { AdminContext } from "../../Context/AdminContext";

const PropertyList = () => {
  const {
    aToken,
    properties,
    getAllProperties,
    changeAvailability,
    deleteProperty,
  } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllProperties();
    }
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Properties</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6 ">
        {properties.map((item, index) => (
          <div
            key={index}
            className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
          >
            <img
              src={item.image}
              alt=""
              className="bg-indigo-50  transition-all duration-500 h-[200px] w-[250px]"
            />
            <div className="p-4">
              <p className="text-neutral-800 text-sm font-medium">
                {item.title}
              </p>
              <p className="text-zinc-600 text-sm">{item.location}</p>
              <div className="mt-2 flex items-center gap-1 text-sm justify-between">
                <div className=" flex">
                  <input
                    type="checkbox"
                    checked={item.availability}
                    onChange={() => changeAvailability(item._id)}
                  />
                  <p className="px-2">Available</p>
                </div>
                <span>
                  <button
                    className="text-xs px-2 py-1 rounded-full text-red-600 border me-1  border-red-600"
                    onClick={() => deleteProperty(item._id)}
                  >
                    Delete
                  </button>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
