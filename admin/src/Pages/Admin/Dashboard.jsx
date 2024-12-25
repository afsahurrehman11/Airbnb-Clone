import { useContext, useEffect } from "react";
import { AdminContext } from "../../Context/AdminContext";
import { assets } from "../../assets/assets.js";

const Dashboard = () => {
  const {
    aToken,
    dashData,
    setDashData,
    getDashData,
    cancelBooking,
    completeBooking,
  } = useContext(AdminContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.properties}
              </p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.bookings}
              </p>
              <p className="text-gray-400">Bookings</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.users}
              </p>
              <p className="text-gray-400">Users</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-3 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>
          <div className="pt-4 border border-t-0">
            {/* Check if latestBookings exists and is an array before using map */}
            {Array.isArray(dashData.latestBookings) &&
            dashData.latestBookings.length > 0 ? (
              dashData.latestBookings.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center px-6 py-3 hover:bg-gray-100"
                >
                  <img
                    src={item.propertyId.image}
                    alt="Property"
                    className="rounded-full w-10"
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">
                      {item.propertyId.title}
                    </p>
                    <p className="text-gray-600">
                      {formatDate(item.checkin)} | {formatDate(item.checkout)}
                    </p>
                  </div>
                  {item.cancelled ? (
                    <p className="text-red-400 text-xs font-medium">
                      Cancelled
                    </p>
                  ) : item.isCompleted ? (
                    <p className="text-green-500 text-xs font-medium">
                      Completed
                    </p>
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
              ))
            ) : (
              <p className="text-gray-500 text-sm p-4">
                No latest bookings available
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
