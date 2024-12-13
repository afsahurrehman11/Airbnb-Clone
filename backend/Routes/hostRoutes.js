import express from "express"
import authHost from "../Middleware/authHost.js"
import upload from "../Middleware/multer.js"
import { addProperty, allProperties, availabilityChangeByHost, cancelBookings, completeBooking, deleteProperty, hostListBooking, } from "../Controllers/hostControllers.js"

const hostRouter = express.Router()

hostRouter.post("/add-property", authHost, upload.single('image'), addProperty)
hostRouter.get("/property-list", authHost, allProperties)
hostRouter.post("/change-availability", authHost, availabilityChangeByHost)
hostRouter.post("/delete-property", authHost, deleteProperty)
hostRouter.get("/host-bookings", authHost, hostListBooking)
hostRouter.post("/cancel-booking", authHost, cancelBookings)
hostRouter.post("/complete-booking", authHost, completeBooking)


export default hostRouter