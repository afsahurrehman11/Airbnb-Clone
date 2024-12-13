import express from "express"
import { addProperty, adminDashboard, allBookings, allProperties, deleteProperty, loginAdmin, completeBooking } from "../Controllers/adminController.js"
import upload from "../Middleware/multer.js"
import authAdmin from "../Middleware/authAdmin.js"
import { changeAvailability } from "../Controllers/propertyControler.js"
import { cancelBooking } from "../Controllers/userComtroller.js"

const adminRouter = express.Router()


adminRouter.post("/add-property", authAdmin, upload.single('image'), addProperty)
adminRouter.post("/login", loginAdmin)
adminRouter.post("/all-properties", authAdmin, allProperties)
adminRouter.post("/change-availability", authAdmin, changeAvailability)
adminRouter.post("/delete-property", authAdmin, deleteProperty)
adminRouter.get("/all-bookings", authAdmin, allBookings)
adminRouter.post("/cancel-booking", authAdmin, cancelBooking)
adminRouter.post("/complete-booking", authAdmin, completeBooking)
adminRouter.get("/dashboard", authAdmin, adminDashboard)


export default adminRouter